<script lang="ts">
	import type { Profile, AssociativeArray } from '$lib/data/myTypes';

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { supabase } from '$lib/data/supabase';

	import { loadMyEvents } from '$lib/util/loadMyEvents';
	import { displayError, displaySuccess } from '$lib/util/displayToast';
	import { isProfileComplete } from '$lib/util/validationHelpers';

	import { myEvents, myReplayEvents } from '$lib/data/myEvents';
	import { myProfile } from '$lib/data/myProfile';
	import { scrollStore } from '$lib/data/scrollStore';

	import EditProfile from './EditProfile.svelte';
	import MyEvents from './MyEvents.svelte';
	import Loading from '../Loading.svelte';
	import LoginForm from './LoginForm.svelte';

	export let cookie: string | undefined;

	const populateUserEvents = async () => {
		if (!cookie) {
			return;
		}
		await loadProfile(); //# hate this. we'll end up calling this function many times. need to re-wire into one central promise.
		$myEvents = await loadMyEvents(cookie, 'pending');
		$myReplayEvents = [
			...(await loadMyEvents(cookie, 'replay')),
			...(await loadMyEvents(cookie, 'past'))
		];
	};

	const resetUser = async () => {
		let registration = await supabase.from('registration').delete().eq('attendee', cookie);
		if (registration.error) {
			displayError('Error deleting registration data!');
		} else {
			displaySuccess('Registration data reset!');
		}

		let tracking = await supabase.from('tracking').delete().eq('attendee', cookie);
		if (tracking.error) {
			displayError('Error deleting tracking data!');
		} else {
			displaySuccess('Tracking data reset!');
		}

		let profile = await supabase.from('attendee').delete().eq('id', cookie);
		if (profile.error) {
			displayError('Error deleting user profile data!');
		} else {
			displaySuccess('User profile reset!');
			setTimeout(() => {
				window.location.replace('/logout');
			}, 1300);
		}
	};

	const updateProfile = async (e: any) => {
		const myBrowser = navigator.userAgent;
		const formData = new FormData(e.target);

		const data: AssociativeArray = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

		data.user_browser = myBrowser ?? '';

		const { error } = await supabase.from('attendee').update(data).eq('id', cookie);

		if (error) {
			console.error(error);
			displayError('Error updating profile!');
		} else {
			loadProfile();
			showForm = false;
			displaySuccess('Profile updated!');
		}
	};

	const loadProfile = async () => {
		if (cookie) {
			let { data } = await supabase.from('attendee').select().eq('id', cookie).single();
			if (data) {
				$myProfile = data as Profile;
				return data as Profile;
			} else {
				console.error('bad cookie - user no longer exists!');
				window.location.replace('/logout');
			}
		} else {
			return false;
		}
	};

	onMount(async () => {
		populateUserEvents();
	});

	let showForm = false;
	let showCultCall = false;
	$: if ($myProfile && !isProfileComplete()) {
		showForm = true;
	}
	$: showCultCall = $scrollStore > 300;
</script>

<div id="userPane" class="bg-[#dedede] p-2 xl:w-64" in:fade>
	{#if showCultCall}
		<button
			on:click={() => {
				document.querySelector('#page')?.scrollTo({
					top: 0,
					left: 0,
					behavior: 'smooth'
				});
			}}
			class="btn variant-filled-primary fixed isolate z-20 top-20 mt-2 w-full xl:w-64 xl:inline-block"
		>
			Return to top
		</button>
	{/if}

	{#if cookie && cookie.length > 0}
		{#if $myProfile && !showForm}
			<div class="pl-2">
				<strong class="text-md text-primary-500 text-center"
					>Welcome {$myProfile.first_name ?? $myProfile.email} {$myProfile.last_name ?? ''}</strong
				>

				<!-- FOR TESTING ONLY - REMOVE THIS -->
				<button class="btn block variant-filled-error" on:click={resetUser}>RESET USER</button>
				<!-- <a href="/logout" class="btn variant-filled-warning">LOGOUT</a> -->
				<!-- FOR TESTING ONLY - REMOVE THIS -->

				<div class="text-sm">
					<button
						on:click={() => {
							showForm = !showForm;
						}}
					>
						Edit my Information
						<i class="fa fa-chevron-right" />
					</button>
				</div>
			</div>
			<MyEvents />
		{:else}
			<strong class="text-lg text-primary-500 text-center"
				>Please enter your information to continue</strong
			>
			<EditProfile profile={$myProfile} {updateProfile} />
			<!-- <ProfileForm /> -->
		{/if}
	{:else}
		<LoginForm />
	{/if}
</div>
