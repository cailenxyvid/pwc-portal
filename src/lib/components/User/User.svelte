<script lang="ts">
	import { onMount } from 'svelte';
	import type { Session } from '@supabase/supabase-js';
	import { supabase } from '$lib/data/supabase';

	import { toastStore } from '@skeletonlabs/skeleton';

	import Register from './Register.svelte';
	import MyEvents from './MyEvents.svelte';
	import Login from './Login.svelte';

	import { myEvents } from '$lib/data/myEvents';

	export let session: Session | null;
	export let cookie: string | undefined;
	
	

	const updateProfile = async (e:any) => {
		const formData = new FormData(e.target);

		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value; //# todo: refactor for TS. this shortcut works for now, despite complaining 
		}		

		const { error } = await supabase
			.from('attendee')
			.update(data)
			.eq('id', session?.user.id)
		if (error) {
			console.error(error);
			toastStore.trigger({
				message: 'Error updating profile!',
				background: 'variant-filled-warning text-white',
			});
		} else {
			loadProfile();
			toastStore.trigger({
				message: 'Profile updated!',
				background: 'variant-filled-success text-white',
				timeout: 10000
			});
		}
    }
	
	const loadProfile = async () => {
		console.log('loadProfile', cookie)
		if (cookie) {
			let { data } = await supabase.from("attendee").select().eq('id', cookie).single();
			profile = data;			
		}
	}

	let loadEvents = async () => {
		if (!cookie) return;
		let { data } = await supabase
			.from("registration")
			.select(`
				attendee,
				event (
					title,
					id
				)
				`)
			.eq('attendee', cookie);
		
		$myEvents = data;
	}

	onMount(async () => {
		//# this would be better done server side (to avoid UI "flicker")
		console.log('User onMount', cookie)
		loadProfile();
		loadEvents();
	});

	// let emailSent = false;
	// let email = '';
	let profile: any;		
</script>

<div class="pt-2 pb-2 md:p-2 w-full">
{#if profile}
<strong class="text-lg text-primary-500 text-center">Welcome {profile.email}</strong>    
	<!-- <button on:click={signOut} class="bg-tertiary-500 text-white rounded-sm">Sign Out</button> -->
	{#if profile}
		<MyEvents />
		{:else}		
		<Register {session} {profile} {updateProfile} />
	{/if}
{:else}
	<Login {session} />
{/if}	
</div>