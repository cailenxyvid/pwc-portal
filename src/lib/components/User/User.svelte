<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import type { Session } from '@supabase/supabase-js';
	import { supabase } from '$lib/data/supabase';

	import { toastStore } from '@skeletonlabs/skeleton';

	import Register from './Register.svelte';
	import MyEvents from './MyEvents.svelte';
	import Login from './Login.svelte';
	import Loading from '../Loading.svelte';

	import { myEvents, myReplayEvents } from '$lib/data/myEvents';
	import { myProfile } from '$lib/data/myProfile';
	import type { MyEvent } from '$lib/data/myTypes';

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
	
	const loadProfile = async (email: string | null = null) => {		
		if (cookie) {
			let { data } = await supabase.from("attendee").select().eq('id', cookie).single();
			// profile = data;		
			$myProfile = data;	
			return data;
		} else if (email) {
			let { data } = await supabase.from("attendee").select().eq('id', cookie).single();
			// profile = data;		
			$myProfile = data;	
			return data;
		} else {
			return;
		}
	}

	let loadEvents = async (type:string) => {
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
			.eq('attendee', cookie)
			.eq('event.status', type);
		
		data = data?.filter(row => row.event != null) //# hack - need to figure out why DB is returning a row when the user has no pending events
		
		//# 
		if (type == 'pending') {
			$myEvents = data;
		} else if (type == 'replay') {
			$myReplayEvents = data;
		}
		console.log('myevents data', typeof data)
		return data;
	}

	onMount(async () => {						
		$myEvents = loadEvents('pending');
		$myReplayEvents = loadEvents('replay');

		//# we really shouldn't have to check this so far in
		if (!cookie && session?.user) {
			cookie = session.user.id;			
		} 
	});		
</script>

<div class="pt-2 pb-2 md:p-2 w-full" in:fade="{{ duration: 5000 }}">	
{#if cookie}  
	{#await loadProfile()}
		<Loading />
	{:then profile} 
		{#if profile?.email}
		<strong class="text-lg text-primary-500 text-center">Welcome {profile.email}</strong>
		<MyEvents />
		{:else}				
		<Register {session} {profile} {updateProfile} />
		{/if}
	{/await}	
{:else}
	<Login {session} />
{/if}	
</div>