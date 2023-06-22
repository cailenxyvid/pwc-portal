import type { ModalComponent } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import { modalStore } from '@skeletonlabs/skeleton';
import { myProfile } from "$lib/data/myProfile";
import { myEvents, myReplayEvents } from '$lib/data/myEvents';
import { displayWarning } from "./displayToast";
import ModalLogin from '$lib/components/User/ModalLogin.svelte';


export const isLoggedIn = (cookie:string|null = null) => {
    if (cookie && cookie.length > 1) {
        return true;
    } else {
        return false;
    }
}

export const isValidEmail = (email:string) => {    
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const result: boolean = expression.test(email); 
    
    return result;
}


//todo: not used or tested
export const isAlphabetOnly = (input:string) => {
    //  /^[a-zA-Z]+$/
    // return input.match('[A-Za-z]')
    // emoji regex   /<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu
    // emoji and all weird chars      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g
    let valid = /^[a-zA-Z]+$/.test(input);
    console.log('isAlpha', valid)
    if (valid) {
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
        const innerComponent: ModalComponent = { ref: ModalLogin };
        modalStore.trigger(
            {
                type: 'component',
                title: 'Enter Email',
                body: 'Provide your email address to continue with registration.',                                
                component: innerComponent,                                
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