import type { PageServerLoad, Actions } from './$types';
import { error } from "@sveltejs/kit";
import { supabase } from "$lib/data/supabase";
import type { Event } from "$lib/data/myTypes";

export async function load() {
  const { data } = await supabase.from("event").select();
  
  return {
    events: data as Event[] ?? []
  };
}

export const actions = { 
  eventStatus: async ({request}) => {
    const data = await request.formData();
    const event_id = data.get('id');
    const target_status = data.get('targetStatus');
    const result = await supabase
				.from('event')
				.update({ status: target_status })
				.eq('id', event_id);
    
      if (result.error) {
        console.error(result.error);
        throw error(500, {
          message: 'Error updating event status'
        });
      } else {        
        return { success: true }
    }
  }
} satisfies Actions;