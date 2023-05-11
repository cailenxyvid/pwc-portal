<script lang="ts">
    import type { Profile } from '$lib/data/myTypes';    
    
    import { supabase } from '$lib/data/supabase';

	import LoginForm from './LoginForm.svelte';

    export let loadProfile = (email:string) => {
        console.error('BypassLogin component instantiated without loadProfile function!')
    }

    export let setCookie = (user_id:string) => {
        console.error('BypassLogin component instantiated without setCookie function!')
    }

    let profile:Profile | boolean;

    let emailSent = false;

    const loginAction = async (email:string) => {
        await supabase.auth.signInWithOtp({ email });
        profile = await loadProfile(email);
        console.log(profile)
        if (profile) {
            setCookie(profile.id)
        }        
    }
</script>

{#if profile}
<strong class="text-lg text-primary-500 text-center">Welcome {profile?.email}</strong>    	 
{:else}
	{#if emailSent}
		<div class="text-success-500 pl-2 w-full">Please check your email to confirm your identity if you need to update your profile. Otherwise, you may continue registering for events.</div>
		{:else}
		<LoginForm {loginAction} />
	{/if}	    
{/if}