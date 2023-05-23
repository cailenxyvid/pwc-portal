// src/routes/+layout.ts
import {
    PUBLIC_SUPABASE_ANON_KEY,
    PUBLIC_SUPABASE_URL
  } from '$env/static/public';
  import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
  import type { LayoutLoad } from './$types';

  //# add this after the DB is setup (if you can make sense of supabase CLI used in this context
  //   import type { Database } from '../DatabaseDefinitions';

  
  export const load: LayoutLoad = async ({ fetch, data, depends }) => {
    let cookie; 
    if (data.cookie) {
      cookie = data.cookie;
    }        

    // depends('supabase:auth');
    //# if we go back and generate types for DB objects, toggle the following line
    // const supabase = createSupabaseLoadClient<Database>({
    // const supabase = createSupabaseLoadClient({
    //   supabaseUrl: PUBLIC_SUPABASE_URL,
    //   supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    //   event: { fetch },
    //   serverSession: data.session
    // });
  
    // const {
    //   data: { session }
    // } = await supabase.auth.getSession();
  
    // avoid missing cookie on first visit from magic link
    // if (!cookie && session?.user.id) {      
    //   cookie = session.user.id;      
    // }

    // return { supabase, session, cookie };
    return { cookie };
  };