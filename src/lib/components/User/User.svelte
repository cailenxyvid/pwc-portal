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
	import type { MyEvent, Profile, AssociativeArray } from '$lib/data/myTypes';

	export let session: Session | null;
	export let cookie: string | undefined;
	
	const updateProfile = async (e:any) => {
		const formData = new FormData(e.target);

		const data: AssociativeArray = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value; 
		}		

		const { error } = await supabase
			.from('attendee')
			.update(data)
			.eq('id', session?.user.id);

		if (error) {
			console.error(error);
			toastStore.trigger({
				message: 'Error updating profile!',
				background: 'variant-filled-warning text-white',
			});
		} else {
			loadProfile();
			showForm = false;
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
			$myProfile = data as Profile;	
			return data;
		} else if (email) {
			let { data } = await supabase.from("attendee").select().eq('email', email).single();			
			$myProfile = data as Profile;	
			return data;
		} else {
			return;
		}
	}

	//# this function exists in two places. fix that.
	let loadEvents = async (type:string) => {
		if (!cookie) return;
		let { data } = await supabase
			.from("registration")
			.select(`
				attendee,
				event (
					title,
					id,
					xyp_id
				)
				`)			
			.eq('attendee', cookie)
			.eq('event.status', type);
		
		if (data) {
			data = data?.filter(row => row.event != null) //# hack - need to figure out why DB is returning a row when the user has no pending events
		
			//# don't love this
			if (type == 'pending') {
				$myEvents = data as MyEvent[];
			} else if (type == 'replay') {
				$myReplayEvents = data as MyEvent[];
			}
			return data as MyEvent[];
		}
		return null;							
	}

	onMount(async () => {						
		loadEvents('pending');
		loadEvents('replay');

		//# we really shouldn't have to check this so far in
		if (!cookie && session?.user) {
			cookie = session.user.id;			
		} 
	});	
	
	let showForm = false;
</script>

<div class="pt-2 pb-2 md:p-2 w-full" in:fade="{{ duration: 5000 }}">	
{#if cookie}  
	{#await loadProfile()}
		<Loading />
	{:then profile} 
		{#if profile?.email && !showForm}
		<strong class="text-lg text-primary-500 text-center">Welcome {profile.email}</strong>
		<div class="text-sm">
			<button on:click={()=>{ showForm = !showForm }}>
				Edit my Information
				<i class="fa fa-chevron-right"></i>
			</button>
		</div>
		<MyEvents {profile} />
		{:else}				
		<Register {session} {profile} {updateProfile} />
		{/if}
	{/await}	
{:else}
	<Login {session} />
{/if}	
</div>