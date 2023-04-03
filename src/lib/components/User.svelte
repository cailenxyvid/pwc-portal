<script lang="ts">
	import { onMount } from 'svelte';
	import type { Session } from '@supabase/supabase-js';  
	import { supabase } from '$lib/data/supabase';

	import { myEvents } from '$lib/data/myEvents';

	import Register from './Register.svelte';
	import MyEvents from './MyEvents.svelte';

	export let session: Session | null;
	
	const signInWithMagicLink = async () => {
		const { data, error } = await supabase.auth.signInWithOtp({ email });
		
		//# todo: need to handle and display errors plus UX for 60 second cap on link request
		if (error) {
			console.error(error)			
		}
		emailSent = true; //todo: setTimeout to reset 
	};

	const updateProfile = async (e:any) => {
		const formData = new FormData(e.target);

		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value; //# todo refactor for TS. this shortcut works for now, despite complaining 
		}		

		const { error } = await supabase
			.from('attendee')
			.update(data)
			.eq('id', session?.user.id)
		if (error) {
			console.error(error);
		} else {
			loadProfile();
		}
    }

	const signOut = async () => {
		if (session) {
			let t = await supabase.auth.signOut();
			console.log('logout response', t, session)
			emailSent = false;
		}
	}

	const loadProfile = async () => {
		if (session) {
			let { data } = await supabase.from("attendee").select().eq('id', session.user.id).single();
			profile = data;
		}
	}

	let loadEvents = async () => {
		if (!session) return;
		let { data } = await supabase
			.from("registration")
			.select(`
				attendee,
				event (
					title,
					id
				)
				`)
			.eq('attendee', session?.user.id);
		
		$myEvents = data;
	}

	onMount(async () => {
		loadProfile();
		loadEvents();
	});

	let emailSent = false;
	let email = '';
	let profile: any;		
</script>

<div class="pt-2 pb-2 md:p-2 w-full">
{#if session}
<strong class="text-lg text-primary-500 text-center">Welcome {session.user.email}</strong>    
	<!-- <button on:click={signOut} class="bg-tertiary-500 text-white rounded-sm">Sign Out</button> -->
	{#if profile && profile.first_name}
		<MyEvents />
		{:else}
		<Register {session} {updateProfile} />
	{/if}    
{:else}
	{#if emailSent}
		<div class="text-success-500 pl-2 w-full">Email sent! Please follow the link in your email to continue with registration.</div>
		{:else}
		<form on:submit|preventDefault={signInWithMagicLink}>
			<input type="email" name="email" id="email" placeholder="email" class="sm:w-2/4 md:w-full md:mb-2" bind:value={email} />
			<button type="submit" class="bg-primary-500 text-white p-2 rounded-sm sm:w-2/4 md:w-full">Register</button>
			<div class="text-sm italic text-secondary-500">You will recieve an email with a sign-in link.</div>
		</form>		
	{/if}	    
{/if}	
</div>