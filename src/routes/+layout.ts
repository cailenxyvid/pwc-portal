// src/routes/+layout.ts
import {
    PUBLIC_SUPABASE_ANON_KEY,
    PUBLIC_SUPABASE_URL
  } from '$env/static/public';
  import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
  import type { LayoutLoad } from './$types';
  //# add these after the DB is setup (if you can make sense of supabase CLI used in this context
  //   import type { Database } from '../DatabaseDefinitions';

  
  export const load: LayoutLoad = async ({ fetch, data, depends }) => {
    depends('supabase:auth');
  
    // const supabase = createSupabaseLoadClient<Database>({
    const supabase = createSupabaseLoadClient({
      supabaseUrl: PUBLIC_SUPABASE_URL,
      supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
      event: { fetch },
      serverSession: data.session
    });
  
    const {
      data: { session }
    } = await supabase.auth.getSession();
  
    return { supabase, session };
  };