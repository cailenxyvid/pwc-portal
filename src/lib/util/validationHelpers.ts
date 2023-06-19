import { get } from 'svelte/store';
import { modalStore } from '@skeletonlabs/skeleton';
import { myProfile } from "$lib/data/myProfile";
import { myEvents, myReplayEvents } from '$lib/data/myEvents';
import { displayWarning } from "./displayToast";
import ModalLogin from '$lib/components/User/ModalLogin.svelte';
import type { ModalComponent } from '@skeletonlabs/skeleton';

export const isLoggedIn = (cookie:string|null = null) => {
    if (cookie && cookie.length > 1) {
        return true;
    } else {
        return false;
    }
}

export const isProfileComplete = () => {
    let profile = get(myProfile);
    return !Object.values(profile).some(element => element == null);
}

export const buttonCheck = (cookie:string|null = null) => {
    if (!isLoggedIn(cookie)) {        
        // displayWarning("Please enter your email to continue")
        const c: ModalComponent = { ref: ModalLogin };
        modalStore.trigger(
            {
                type: 'component',
                title: 'Enter Email',
                body: 'Provide your email address to continue with registration.',                
                // valueAttr: { type: 'email', minlength: 3, maxlength: 30, required: true },
                component: c,
                
                // modalClasses: '!bg-red-500',
                // Returns the updated response value
                response: (r: string) => console.log('modal email:', r),
            }
        );
        return false;
    }

    if (!isProfileComplete()) {        
        displayWarning("Please enter your information to continue")
        document.querySelector('#page')?.scrollTo(0,0);
        document.getElementById("first_name")?.focus();
        return false;
    }
    
    return true;
}

export const isAlreadyRegistered = (event_id:string) => {
    let events = get(myEvents);
    let replayEvents = get(myReplayEvents);   
    return events.some(e => event_id == e.event.id) || replayEvents.some(e => event_id == e.event.id);
}