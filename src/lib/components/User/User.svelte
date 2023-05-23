<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import type { Session } from '@supabase/supabase-js';
	import { supabase } from '$lib/data/supabase';

	import { toastStore } from '@skeletonlabs/skeleton';

	import EditProfile from './EditProfile.svelte';
	import MyEvents from './MyEvents.svelte';
	import BypassLogin from './BypassLogin.svelte';
	import Loading from '../Loading.svelte';

	import { myEvents, myReplayEvents } from '$lib/data/myEvents';
	import { myProfile } from '$lib/data/myProfile';
	import type { MyEvent, Profile, AssociativeArray } from '$lib/data/myTypes';

	// export let session: Session | null;
	export let cookie: string | undefined;

	const resetUser = async () => {
		let registration = await supabase
			.from('registration')
			.delete()
			.eq('attendee', cookie)
		if (registration.error) {
			toastStore.trigger({
				message: 'Error deleting registration data!',
				background: 'variant-filled-warning',
			});
		} else {
			toastStore.trigger({
				message: 'Registration data reset!',
				background: 'variant-filled-success',
			});
		}

		loadEvents('pending');
		loadEvents('replay');
		$myProfile.email = ''
		$myProfile.id = ''
		let profile = await supabase
			.from('attendee')
			.delete()
			.eq('id', cookie)
		if (profile.error) {
			toastStore.trigger({
				message: 'Error deleting user profile data!',
				background: 'variant-filled-warning',
			});
		} else {
			toastStore.trigger({
				message: 'User profile reset!',
				background: 'variant-filled-success',
			});
		}

		setCookie('')
		cookie = undefined;
		toastStore.trigger({
				message: 'Cookie reset!',
				background: 'variant-filled-success',
			});
	}
	
	const setCookie = (user_id:string) => {
		cookie = user_id;
		document.cookie = "xyp_user_id="+user_id;
	}

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
			.eq('id', cookie);

		if (error) {
			console.error(error);
			toastStore.trigger({
				message: 'Error updating profile!',
				background: 'variant-filled-warning',
			});
		} else {
			loadProfile();
			showForm = false;
			toastStore.trigger({
				message: 'Profile updated!',
				background: 'variant-filled-success',
				timeout: 10000
			});
		}
    }
	
	const createProfile = async (email: string) => {
		const { data, error } = await supabase
        .from('attendee')
        .insert({ email: email})
        .select();

		if (error) {
			console.log(error);
			toastStore.trigger({
				message: 'Error registering your email!',
				background: 'variant-filled-warning',
			});
		} else {
			setCookie(data[0].id)
			loadProfile();
		}
	}

	const loadProfile = async (email: string | null = null) => {		
		if (cookie) {
			console.log('found cookie', cookie)
			let { data } = await supabase.from("attendee").select().eq('id', cookie).single();	
			if (data) {
				$myProfile = data as Profile;				
				return data as Profile;
			} else {
				setCookie(''); //# handle incorrect cookies from before auth refactor
				console.error('cookie bad!')
			}
		} else if (email) {
			let { data } = await supabase.from("attendee").select().eq('email', email).single();			
			$myProfile = data as Profile;	
			if (!$myProfile?.id) {
				createProfile(email);
			} else {
				console.log('setting cookie client side', $myProfile.id)
				setCookie($myProfile.id);
			}
			loadEvents('pending');
			loadEvents('replay');
			return data as Profile;
		} else {
			return false;
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
		
			//# don't love this - doesn't handle n types
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
		// if (!cookie && session?.user) {
		// 	cookie = session.user.id;			
		// } 
	});	
	
	let showForm = false;
	$: if ($myProfile && !$myProfile.first_name) { showForm = true } //# ugly
</script>

<div class="pt-2 pb-2 md:p-2 w-full" in:fade="{{ duration: 5000 }}">	
{#if cookie && cookie.length > 0}  
	{#await loadProfile()}
		<Loading />
	{:then profile} 
		{#if profile && !showForm}
		<strong class="text-lg text-primary-500 text-center">Welcome {profile.email}</strong>
		
		<!-- FOR TESTING ONLY - REMOVE THIS -->
		<button class="btn block variant-filled-error" on:click={resetUser}>RESET USER</button>

		<div class="text-sm">
			<button on:click={()=>{ showForm = !showForm }}>
				Edit my Information
				<i class="fa fa-chevron-right"></i>
			</button>
		</div>
		<MyEvents {profile} />
		{:else}				
		<strong class="text-lg text-primary-500 text-center">Please enter your information to continue</strong>
		<EditProfile profile={$myProfile} {updateProfile} />
		{/if}
	{/await}	
{:else}
	<BypassLogin {loadProfile} />
{/if}	
</div>