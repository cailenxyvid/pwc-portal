import { redirect } from '@sveltejs/kit'

// export const actions = {
//     default: async ({ request, cookies }) => {
//         cookies.delete('xyp_user_id')
//         throw redirect(303, '/');
//     }
// }

export const GET = ({ request, cookies }) => {
    cookies.delete('xyp_user_id')
    throw redirect(303, '/');
}