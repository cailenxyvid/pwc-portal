import type { Event } from '$lib/data/myTypes';
import { PUBLIC_XYP_API_KEY, PUBLIC_XYP_REGISTRATION_URL } from '$env/static/public';
import { get } from 'svelte/store';
import { supabase } from '$lib/data/supabase';
import { myProfile } from '$lib/data/myProfile';
import { myEvents, myReplayEvents } from '$lib/data/myEvents';
import { displayError, displaySuccess } from '$lib/util/displayToast';
import { loadMyEvents } from '$lib/util/loadMyEvents';
import { buttonCheck, isAlreadyRegistered } from '$lib/util/validationHelpers';


const registerXyp = async (x_id: string) => {    
    let profile = get(myProfile);
    if (!profile) {
        displayError('Missing user profile!');
        return false;
    }

    if (!x_id) {
        displayError('Missing XyvidPro Event ID!');
        return false;
    }

    //# currently the api will 500 if any of these are empty
    // we shouldn't have empty values at this stage since all are required (?) when creating profile but still, brittle
    let x_body = {
        events: [x_id],
        fname: profile.first_name ? profile.first_name : '.', //# if someday there is a weird bug with a bunch of '.' in data, i am so sorry
        lname: profile.last_name ? profile.last_name : '.',
        company: profile.company ? profile.company : '.',
        email: profile.email ? profile.email : '.',
        location: profile.country ? profile.country : '.',
        joblevel: profile.job_level ? profile.job_level : '.',
        jobtitle: profile.job_title ? profile.job_title : '.'
    };

    // expected format:
    // x_body = {
    // 	"events": [
    // 		"152109"
    // 	],
    // 	"fname": "Cailen",
    // 	"lname": "Fisher",
    // 	"company": "XYVID",
    // 	"email": "cfisher@xyvid.com",
    // 	"location": "US",
    // 	"joblevel": "Staff",
    // 	"jobtitle": "Dev"
    // }

    let x_reg = await fetch(PUBLIC_XYP_REGISTRATION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Accept': '*/*',
            'x-api-key': PUBLIC_XYP_API_KEY
        },
        body: JSON.stringify(x_body)
    });

    if (x_reg.ok) {
        let response = await x_reg.json();

        const { error } = await supabase
            .from('attendee')
            .update({ xyp_attnum: response[0].AttendeeID })
            .eq('id', profile.id);

        if (error) {
            displayError('Error updating XYP attnum after event registration!');
            console.error(error);
            return false;
        }
        return true;
    } else {
        displayError('Unknown error completing XYP registration!');
        console.error(x_reg.statusText);
    }
};

export const registerEvent = async (event: Event, cookie: string | undefined) => {
    if (isAlreadyRegistered(event.id)) {
        return false;
    }
    
    // this will pop the login modal if there is no cookie
    if (!buttonCheck(cookie) || !cookie) {
        return false;
    }
    
    // complete XYP registration first, only update records if success
    if (!(await registerXyp(event.xyp_id))) {
        displayError('Error registering with Xyvid Pro');
        return false;
    }
    const existing = await supabase
        .from('registration')
        .select()
        .eq('event', event.id)
        .eq('attendee', cookie);

    if (existing.data && existing.data.length > 0) {
        return;
    }

    const { data, error } = await supabase
        .from('registration')
        .insert({ event: event.id, attendee: cookie })
        .select();

    if (error) {
        displayError(error.message);
    }
    
    myEvents.set(await loadMyEvents(cookie));
    myReplayEvents.set([
        ...(await loadMyEvents(cookie, 'replay')),
        ...(await loadMyEvents(cookie, 'past'))
    ]);
    if (event.status == 'pending') {        
        displaySuccess('You are registered!');
    }
};