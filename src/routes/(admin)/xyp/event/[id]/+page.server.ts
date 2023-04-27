import { error } from "@sveltejs/kit";
import { supabase } from "$lib/data/supabase";

import type { Event, AssociativeArray } from "$lib/data/myTypes";
import type { Actions } from './$types';

export const actions = {
    default: async ({ request, params }) => {        
      const data: AssociativeArray = {};
      const form = await request.formData();        
      
      for (let field of form) {
        const [key, value] = field;
        data[key] = value;            
      }

      const result = await supabase
        .from('event')
        .update(data)
        .eq('id', params.id);
        
      if (result.error) {
        console.error(result.error);
        throw error(500, {
          message: 'Error saving event'
        });
      } else {        
        return { success: true }
      }
    }
} satisfies Actions;

export async function load({ params }) {
  const { data } = await supabase.from("event").select().eq('id', params.id).single();
  
  return {
    event: data as Event ?? null
  };
}