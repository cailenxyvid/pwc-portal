<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { supabase } from '$lib/data/supabase';
	import { toastStore } from '@skeletonlabs/skeleton';

	import { loadMyEvents } from '$lib/util/loadMyEvents';

	import EditProfile from './EditProfile.svelte';
	import MyEvents from './MyEvents.svelte';
	import BypassLogin from './BypassLogin.svelte';
	import Loading from '../Loading.svelte';

	import { myEvents, myReplayEvents } from '$lib/data/myEvents';
	import { myProfile } from '$lib/data/myProfile';
	import { scrollStore } from '$lib/data/scrollStore';

	import type { MyEvent, Profile, AssociativeArray } from '$lib/data/myTypes';
	
	export let cookie: string | undefined;
	export let setCookie = (user_id:string) => {
		console.error('Missing setCookie function in User component')
	}

	const populateUserEvents = async () => {	
		if (!cookie) { console.error('Missing cookie in User.populateUserEvents!'); return;	}
		await loadProfile(); //# hate this. we'll end up calling this function many times. need to re-wire into one central promise.		
		$myEvents = await loadMyEvents(cookie, 'pending');
		$myReplayEvents = await loadMyEvents(cookie, 'replay');
	}

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

		populateUserEvents();
		$myProfile.email = ''
		$myProfile.id = ''
		$myProfile.first_name = ''
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
		console.log('done with resetUser', cookie, $myProfile, $myEvents)
	}
	
	// const setCookie = (user_id:string) => {
	// 	cookie = user_id;
	// 	document.cookie = "xyp_user_id="+user_id;
	// }

	const updateProfile = async (e:any) => {
		const myBrowser = navigator.userAgent;
		const formData = new FormData(e.target);

		const data: AssociativeArray = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value; 			
		}		

		data.user_browser = myBrowser ?? '';
		
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
		console.log('loadProfile, checking cookie', cookie)
		if (cookie) {			
			let { data } = await supabase.from("attendee").select().eq('id', cookie).single();	
			if (data) {
				$myProfile = data as Profile;				
				return data as Profile;
			} else {
				setCookie(''); //# handle incorrect cookies from before auth refactor (and now the damn "reset user" button)
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
			cookie = $myProfile.id;
			populateUserEvents();
			return data as Profile;
		} else {
			return false;
		}
	}

	onMount(async () => {						
		populateUserEvents();
	});	
	
	let showForm = false;
	let showCultCall = true;
	$: if ($myProfile && !$myProfile.first_name) { showForm = true } //# ugly
	$: showCultCall = ($scrollStore > 300)	
</script>

<div id="userPane" class="bg-[#dedede] pt-2 pb-2 md:px-0 md:w-64" in:fade="{{ duration: 500 }}">			
	{#if showCultCall}<button on:click={() => {
		document.querySelector('#page').scrollTo(0,0);
	}} class="btn variant-filled-primary fixed z-50 top-20 mt-2 w-full md:w-64">Join us</button>{/if}
{#if cookie && cookie.length > 0}  
	{#await loadProfile()}
		<Loading />
	{:then profile} 
		{#if profile && !showForm}		
		<strong class="text-md text-primary-500 text-center">Welcome {profile.email}</strong>
		
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