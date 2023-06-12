export const load = async ({ cookies }) => {

  return {
    cookie: cookies.get('xyp_user_id'),
  };
};