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
        .insert(data)
        .select();
        
      if (result.error) {
        console.error(result.error);
        throw error(500, {
          message: 'Error creating event'
        });
      } else {
        // console.log(result.data);
        return { success: true, new_event: result.data[0].id }
      }
    }
} satisfies Actions;
