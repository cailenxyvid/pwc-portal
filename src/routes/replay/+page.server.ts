import { supabase } from "$lib/data/supabase"

export async function load() {
  const { data } = await supabase.from("event").select().eq('status', 'replay');
  console.log('get events', data)
  return {
    events: data ?? [],
  };
}