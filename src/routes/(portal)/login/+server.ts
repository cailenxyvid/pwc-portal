import { supabase } from "$lib/data/supabase";
import { redirect } from '@sveltejs/kit'

export const POST = async ( { request, cookies } ) => {
    const form = await request.formData();
    const email = form.get('email');
    if (email) {
        const profile = await supabase.from("attendee").select().eq('email', email).single();
        if (profile.data?.id) {
            cookies.set('xyp_user_id', profile.data.id);
        } else {
            const newProfile = await supabase.from('attendee').insert({ email: email}).select().single();
            cookies.set('xyp_user_id', newProfile.data?.id);
        }
    }
    throw redirect(303, '/');
}