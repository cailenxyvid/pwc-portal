import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {

  return {
    cookie: cookies.get('xyp_user_id'),
  };
};