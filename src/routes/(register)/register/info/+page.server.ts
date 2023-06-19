import { error, fail, redirect } from "@sveltejs/kit";
import { supabase } from "$lib/data/supabase";
import type { Profile, AssociativeArray } from "$lib/data/myTypes";


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
      let missingFields = [];

      for (let field of form) {
        const [key, value] = field;
        data[key] = value;
        if (!value) {
          missingFields.push(key);    
        }         
      }

      if (missingFields.length > 0) {
        return fail(418, { //# 422 might be more appropriate but..
          error: 'Missing information!',
          missingFields: missingFields
        });
      }
  
      const result = await supabase
        .from('attendee')
        .update(data)
        .eq('id', user_id ?? data.id);
        
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
