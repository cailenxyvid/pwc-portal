<script lang="ts">
	import type { Session } from '@supabase/supabase-js';

	import { supabase } from '$lib/data/supabase';
	import LoginForm from './LoginForm.svelte';

	export let session: Session | null;
	// export let cookie: string | undefined;

	let emailSent = false;
	let email = '';

	const signInWithMagicLink = async () => {
		const { data, error } = await supabase.auth.signInWithOtp({ email });

		//# todo: need to handle and display errors plus UX for 60 second cap on link request
		if (error) {
			console.error(error);
		}
		emailSent = true; //todo: setTimeout to reset
	};

	// const signOut = async () => {
	// 	if (session) {
	// 		let t = await supabase.auth.signOut();
	// 		console.log('logout response', t, session)
	// 		emailSent = false;
	// 	}
	// }
</script>

{#if session}
	<strong class="text-lg text-primary-500 text-center">Welcome {session.user.email}</strong>
{:else if emailSent}
	<div class="text-success-500 pl-2 w-full">
		Email sent! Please close this window and follow the link in your email to continue with
		registration.
	</div>
{:else}
	<LoginForm loginAction={signInWithMagicLink} />
	<!-- <form on:submit|preventDefault={signInWithMagicLink}>
			<input type="email" name="email" id="email" placeholder="email" class="sm:w-2/4 md:w-full md:mb-2" bind:value={email} />
			<button type="submit" class="bg-primary-500 text-white p-2 rounded-sm sm:w-2/4 md:w-full">Register</button>
			<div class="text-sm text-secondary-500">You will recieve an email with a sign-in link.</div>
		</form>		 -->
{/if}
