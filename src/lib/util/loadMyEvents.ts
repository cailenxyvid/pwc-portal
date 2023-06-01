import { supabase } from "$lib/data/supabase";
import type { MyEvent } from '$lib/data/myTypes';

export const loadMyEvents = async (user_id:string, type = 'pending') => {
    // console.log('loadMyEvents user_id', user_id)
    let { data } = await supabase
        .from("registration")
        .select(`
            attendee,
            event (
                title,
                id,
                xyp_id
            )
            `)
        .eq('attendee', user_id)
        .eq('event.status', type);
    
    if (data) {
        data = data?.filter(row => row.event != null) //# hack - need to figure out why DB is returning a row when the user has no pending events		        
    } 
    return (data ?? []) as MyEvent[];
}