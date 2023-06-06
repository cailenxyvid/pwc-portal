import { supabase } from "$lib/data/supabase";
import { toastStore } from '@skeletonlabs/skeleton';

export const trackAction = async (user_id:string, action:string, event_id:string|null = null) => {
    const { error } = await supabase
        .from('tracking')
        .insert({ attendee: user_id, action: action, event: event_id})
        .select();
    
    if (error) {
        console.error('Error in trackAction', error);
        toastStore.trigger({
            message: 'Error Tracking User Action',
            background: 'variant-filled-error',
        });
    }
}