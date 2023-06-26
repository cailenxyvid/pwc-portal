import type { Event } from "$lib/data/myTypes";
import { supabase } from "$lib/data/supabase";
import { error } from "@sveltejs/kit";

export async function load() {
    const results = await supabase
    .from('event')
    .select()    
    .neq('status', 'pending')
    .order('event_start', {ascending: false});

    if (results.error) {
        throw error(500, 'There was an error loading past CPE events!')
    }

    return {
        list: results.data ?? [] as Event[]
    }
}
