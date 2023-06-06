import { supabase } from "$lib/data/supabase";
import { xyp_api_key, xyp_registration_url, xyp_portal_url } from '$env/static/private';
import type { Event, MyEvent } from "$lib/data/myTypes";
import { loadMyEvents } from '$lib/util/loadMyEvents';

export async function load({ parent }) {
  const pending = await supabase.from("event").select().eq('status', 'pending').order('event_start', {ascending: false});
  const past = await supabase.from("event").select().neq('status', 'pending').order('featured').order('event_start', {ascending: false});

  const { cookie } = await parent();

  let myPendingEvents: MyEvent[] = [];
  let myReplayEvents: MyEvent[] = [];

  if (cookie) {
    myPendingEvents = await loadMyEvents(cookie);
    myReplayEvents = await loadMyEvents(cookie, 'replay');
  }
  
  console.log('page.server coookie check', cookie, myPendingEvents.length)
  // check for cookie, preload profile and myEvents if possible
  return {
    pendingEvents: pending.data as Event[] ?? [],
    pastEvents: past.data as Event[] ?? [],
    myPendingEvents: myPendingEvents,
    myReplayEvents: myReplayEvents,
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