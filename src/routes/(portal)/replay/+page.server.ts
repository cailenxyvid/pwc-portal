import { supabase } from "$lib/data/supabase"

export async function load() {
  const { data } = await supabase.from("event").select().eq('status', 'replay');  
  return {
    events: data ?? [],
  };
}