import { supabase } from "$lib/data/supabase"

export async function load() {
  const { data } = await supabase.from("event").select();
  console.log('get events', data)
  return {
    events: data ?? [],
  };
}