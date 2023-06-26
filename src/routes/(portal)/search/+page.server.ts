import type { Event } from "$lib/data/myTypes";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "$lib/data/supabase";

export async function load({ url }) {
    let params = await url.searchParams;
    let q = params.get('queryString') as string;

    // override actual search if the user is trying to type in 'cpe' for some reason
    if (q.toLowerCase() === 'cpe') {
        throw redirect(303, '/eventlist');
    }

    //# depends on custom search column function (event_search_cols) in postgres
    const upcoming = await supabase
        .from('event')
        .select()
        .textSearch('pending_event_search_cols', q, {
            type: 'plain',
            config: 'english'
        })
        .eq('status', 'pending')
        .order('event_start', {ascending: false});
    const replay = await supabase
        .from('event')
        .select()
        .textSearch('past_event_search_cols', q, {
            type: 'plain',
            config: 'english'
        })
        .eq('status', 'replay')
        .order('event_start', {ascending: false});   
    const past = await supabase
        .from('event')
        .select()
        .textSearch('past_event_search_cols', q, {
            type: 'plain',
            config: 'english'
        })
        .eq('status', 'past')
        .order('event_start', {ascending: false});     
    const faq = await supabase
        .from('faq')
        .select()
        .textSearch('faq_search_cols', q, {
            type: 'plain',
            config: 'english'
        });
        
    if (upcoming.error || replay.error || past.error || faq.error) {
        console.error(upcoming.error, replay.error, past.error, faq.error);
        throw error(500, {
            message: 'Error getting search results!'
          });
    }
    return {
      upcoming: upcoming.data as Event[] ?? [],
      replay: replay.data as Event[] ?? [],
      past: past.data as Event[] ?? [],
      faq: faq.data ?? [],
      totalResults: upcoming.data.length + replay.data.length + past.data.length + faq.data.length,
      query: q ?? null
    };
}