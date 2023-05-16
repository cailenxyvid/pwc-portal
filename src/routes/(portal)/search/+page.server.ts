import type { Event } from "$lib/data/myTypes";
import { error } from "@sveltejs/kit";
import { supabase } from "$lib/data/supabase";

export async function load({ url }) {
    let params = await url.searchParams;
    let q = params.get('queryString') as string;
    const upcoming = await supabase
        .from('event')
        .select()
        .textSearch('title', q, {
            type: 'plain',
            config: 'english'
        })
        .eq('status', 'pending');
    const replay = await supabase
        .from('event')
        .select()
        .textSearch('title', q, {
            type: 'plain',
            config: 'english'
        })
        .eq('status', 'replay');   
    const past = await supabase
        .from('event')
        .select()
        .textSearch('title', q, {
            type: 'plain',
            config: 'english'
        })
        .eq('status', 'past');     
    
    if (upcoming.error || replay.error || past.error) {
        console.error(upcoming.error, replay.error, past.error);
        throw error(500, {
            message: 'Error getting search results!'
          });
    }
    return {
      upcoming: upcoming.data as Event[] ?? [],
      replay: replay.data as Event[] ?? [],
      past: past.data as Event[] ?? [],
      faq: []
    };
}