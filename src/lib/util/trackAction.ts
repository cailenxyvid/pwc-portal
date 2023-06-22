import { supabase } from "$lib/data/supabase";
import { displayError } from "./displayToast";

export const trackAction = async (user_id:string, action:string, event_id:string|null = null) => {
    const { error } = await supabase
        .from('tracking')
        .insert({ attendee: user_id, action: action, event: event_id})
        .select();
    
    if (error) {
        console.error('Error in trackAction', error);
        displayError('Error Tracking User Action');
    }
}