import { error } from "@sveltejs/kit";
import { supabase } from "$lib/data/supabase";
import type { Event } from "$lib/data/myTypes";

export async function load({ params }) {
  const result = await supabase.from("event").select().eq('id', params.id).single();
  
  if (result.error) {
    console.error(result.error);
    throw error(500, {
        message: 'Error loading event!'
      });
  }
  return {
    event: result.data as Event
  };
}
