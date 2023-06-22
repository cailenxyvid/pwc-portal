import type { LayoutServerLoad } from './$types';


import { loadMyEvents } from '$lib/util/loadMyEvents';
import { myEvents, myReplayEvents } from '$lib/data/myEvents';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const cookie = cookies.get('xyp_user_id');

  if (cookie) {
    myEvents.set(await loadMyEvents(cookie));
    myReplayEvents.set([...await loadMyEvents(cookie, 'replay'), ...await loadMyEvents(cookie, 'past')]);        
  } 

  return {
    cookie: cookie,
  };
};