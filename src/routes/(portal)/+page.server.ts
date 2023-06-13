import { supabase } from "$lib/data/supabase";
import { redirect } from '@sveltejs/kit'
import { xyp_api_key, xyp_registration_url, xyp_portal_url } from '$env/static/private';
import type { Event, MyEvent, Profile } from "$lib/data/myTypes";
import { loadMyEvents } from '$lib/util/loadMyEvents';
import { isProfileComplete } from "$lib/util/validationHelpers.js";

export async function load({ parent }) {
  const pending = await supabase.from("event").select().eq('status', 'pending').order('event_start', {ascending: false});
  const past = await supabase.from("event").select().neq('status', 'pending').order('featured').order('event_start', {ascending: false});

  const { cookie } = await parent();

  let myPendingEvents: MyEvent[] = [];
  let myReplayEvents: MyEvent[] = [];
  let myProfile: Profile | undefined;

  if (cookie) {
    myPendingEvents = await loadMyEvents(cookie);
    myReplayEvents = await loadMyEvents(cookie, 'replay');
    let getProfile = await supabase.from("attendee").select().eq('id', cookie).single();
    myProfile = getProfile.data as Profile;
    
    if (Object.values(myProfile).some(element => element == null)) {
      // redirect to user info form if profile is incomplete
      // throw redirect(303, '/register/info');
    }
  } else {
    // redirect to signin form if no cookie
    // throw redirect(303, '/register');
  }
  
  return {
    pendingEvents: pending.data as Event[] ?? [],
    pastEvents: past.data as Event[] ?? [],
    myPendingEvents: myPendingEvents,
    myReplayEvents: myReplayEvents,
    myProfile: myProfile,
    xyp_settings: {
      xyp_api_key: xyp_api_key,
      xyp_registration_url: xyp_registration_url,
      xyp_portal_url: xyp_portal_url
    }, //# delete flat props once not being used
    xyp_api_key: xyp_api_key,
    xyp_registration_url: xyp_registration_url,
    xyp_portal_url: xyp_portal_url
  };
}

// login / logout actions