import { supabase } from "$lib/data/supabase";

import type { Event, MyEvent, Profile } from "$lib/data/myTypes";
import { loadMyEvents } from '$lib/util/loadMyEvents';

export async function load({ parent }) {
  const pending = await supabase.from("event").select().eq('status', 'pending').order('event_start', {ascending: false});
  const past = await supabase.from("event").select().neq('status', 'pending').order('featured').order('event_start', {ascending: false});

  const { cookie } = await parent();

  let myPendingEvents: MyEvent[] = [];
  let myReplayEvents: MyEvent[] = [];
  let myProfile: Profile | undefined;

  if (cookie) {
    myPendingEvents = await loadMyEvents(cookie);
    myReplayEvents = [...await loadMyEvents(cookie, 'replay'), ...await loadMyEvents(cookie, 'past')];
    let getProfile = await supabase.from("attendee").select().eq('id', cookie).single();
    myProfile = getProfile.data as Profile;
  } 
  
  return {
    pendingEvents: pending.data as Event[] ?? [],
    pastEvents: past.data as Event[] ?? [],
    myPendingEvents: myPendingEvents,
    myReplayEvents: myReplayEvents,
    myProfile: myProfile ?? null,
  };
}
