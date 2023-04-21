import { supabase } from "$lib/data/supabase";
import type { Event } from "$lib/data/myTypes";

export async function load() {
  const { data } = await supabase.from("event").select();
  
  return {
    events: data as Event[] ?? []
  };
}