import { get } from 'svelte/store';
import { myProfile } from "$lib/data/myProfile";
import { myEvents, myReplayEvents } from '$lib/data/myEvents';
import { displayWarning } from "./displayToast";

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
        displayWarning("Please enter your email to continue")
        return false;
    }

    if (!isProfileComplete()) {        
        displayWarning("Please enter your information to continue")
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