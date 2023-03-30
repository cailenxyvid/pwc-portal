<script lang="ts">
	import type { Session } from '@supabase/supabase-js';  
	export let session: Session | null;

	import { supabase } from '$lib/data/supabase';

	const signInWithMagicLink = async () => {
		const { data, error } = await supabase.auth.signInWithOtp({ email });
		console.log(data, error);
		//# todo: need to handle and display errors plus UX for 60 second cap on link request
	};

	let email ='';
</script>

{#if !session}
<div class="bg-secondary-500">
    <form on:submit|preventDefault={signInWithMagicLink}>
        <input type="email" name="email" id="email" placeholder="email" bind:value={email} />
        <button type="submit" class="bg-primary-500 p-2 rounded-sm">Sign In with Magic Link</button>
    </form>
</div>
{:else}
    <h1>Welcome {session.user.email}</h1>    
{/if}	