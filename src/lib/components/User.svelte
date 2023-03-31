<script lang="ts">
	import type { Session } from '@supabase/supabase-js';  
	export let session: Session | null;

	import { supabase } from '$lib/data/supabase';

	const signInWithMagicLink = async () => {
		const { data, error } = await supabase.auth.signInWithOtp({ email });
		console.log(data, error);
		//# todo: need to handle and display errors plus UX for 60 second cap on link request
		emailSent = true;
	};

	const signOut = async () => {
		if (session) {
			let t = await supabase.auth.signOut();
			console.log('logout response', t, session)
			emailSent = false;
		}
	}

	let emailSent = false;
	let email = '';
</script>

{#if !session}
<div class="bg-secondary-500 pt-2 pb-2 md:p-2 w-full">
    {#if emailSent}
		<div class="text-success-500 pl-2 w-full">Email sent!</div>
		{:else}
		<form on:submit|preventDefault={signInWithMagicLink}>
			<input type="email" name="email" id="email" placeholder="email" class="sm:w-2/4 md:w-full md:mb-2" bind:value={email} />
			<button type="submit" class="bg-primary-500 p-2 rounded-sm sm:w-2/4 md:w-full">Sign In with Magic Link</button>
		</form>		
	{/if}	
</div>
{:else}
    <strong class="text-lg text-primary-500 text-center">Welcome {session.user.email}</strong>    
	<button on:click={signOut} class="bg-tertiary-500 text-white rounded-sm">Sign Out</button>
{/if}	