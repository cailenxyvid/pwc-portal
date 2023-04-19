import { supabase } from "$lib/data/supabase";
import { xyp_api_key, xyp_registration_url, xyp_portal_url } from '$env/static/private';
import type { Event } from "$lib/data/myTypes";

export async function load() {
  const { data } = await supabase.from("event").select().eq('status', 'pending');
  
  return {
    events: data as Event[] ?? [],
    xyp_api_key: xyp_api_key,
    xyp_registration_url: xyp_registration_url,
    xyp_portal_url: xyp_portal_url
  };
}