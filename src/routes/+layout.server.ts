// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession }, cookies }) => {
  let session = await getSession();
  
  // if we have an active Supabase auth session, re/set the persistent cookie
  if (session?.user.id) {
    cookies.set('xyp_user', session.user.id);
  }

  return {
    session: getSession(),
    cookie: cookies.get('xyp_user')
  };
};