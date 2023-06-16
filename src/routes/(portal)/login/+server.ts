import { supabase } from "$lib/data/supabase";
import { redirect, error } from '@sveltejs/kit'
import { trackAction } from "$lib/util/trackAction.js";

export const POST = async ( { request, cookies } ) => {
    const form = await request.formData();
    const email = form.get('email');

    if (email) {        
        const profile = await supabase.from('attendee').select().eq('email', email).single();
        if (profile.data?.id) {
            cookies.set('xyp_user_id', profile.data.id);
        } else {
            const newProfile = await supabase.from('attendee').insert({ email: email}).select().single();
            cookies.set('xyp_user_id', newProfile.data?.id);
            trackAction(newProfile.data?.id, 'create_user');
            const oldProfile = await supabase.from('attendee_import').select().eq('email', email).single();

            if (oldProfile.data?.email) {
                // copy old data just this once, during initial attendee creation
                console.log('importing user profile data for ' + oldProfile.data?.email, oldProfile.data)
                const updateProfile = await supabase.from('attendee').update(oldProfile.data).eq('id', newProfile.data?.id);
                if (updateProfile.error) {
                    console.error(updateProfile.error);
                    throw error(500, 'Error importing user profile!');
                }
                trackAction(newProfile.data?.id, 'import_profile');
            }
        }
    }
    throw redirect(303, '/');
}