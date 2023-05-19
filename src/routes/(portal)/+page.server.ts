import { supabase } from "$lib/data/supabase";
import { xyp_api_key, xyp_registration_url, xyp_portal_url } from '$env/static/private';
import type { Event } from "$lib/data/myTypes";

export async function load() {
  const pending = await supabase.from("event").select().eq('status', 'pending');
  const past = await supabase.from("event").select().neq('status', 'pending').order('featured').order('event_start', {ascending: false});

  return {
    pendingEvents: pending.data as Event[] ?? [],
    pastEvents: past.data as Event[] ?? [],
    xyp_api_key: xyp_api_key,
    xyp_registration_url: xyp_registration_url,
    xyp_portal_url: xyp_portal_url
  };
}