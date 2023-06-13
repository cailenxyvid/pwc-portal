import { error, redirect } from "@sveltejs/kit";
import { supabase } from "$lib/data/supabase";
import type { Profile } from "$lib/data/myTypes";
import type { AssociativeArray } from "$lib/data/myTypes";

let user_id:string|undefined;

export async function load({ parent }) {
  const { cookie } = await parent();
  user_id = cookie;
  const result = await supabase.from("attendee").select().eq('id', cookie).single();

  if (result.error) {
    console.error(result.error);
    throw error(500, {
        message: 'Error loading user profile!'
      });
  }
  return {
    profile: result.data as Profile,
    cookie: cookie,
  };
}

export const actions = {
    default: async ({ request }) => {        
      const data:AssociativeArray = {};
      const form = await request.formData();        
      
      for (let field of form) {
        const [key, value] = field;
        data[key] = value;            
      }
  console.log(data)
      const result = await supabase
        .from('attendee')
        .update(data)
        .eq('id', user_id ?? data.id);
        console.log(result)
      if (result.error) {
        console.error(result.error);
        throw error(500, {
          message: 'Error saving user profile!'
        });
      } else {        
        throw redirect(303, '/');
      }
    } 
  }
