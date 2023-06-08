<script lang="ts">
	import { supabase } from '$lib/data/supabase';

	import { loadMyEvents } from '$lib/util/loadMyEvents';
	import { displayError, displayWarning, displaySuccess } from '$lib/util/displayToast';
	import { buttonCheck } from '$lib/util/validationHelpers';

	import User from '$lib/components/User/User.svelte';
	import UpcomingEvent from '$lib/components/UpcomingEvent.svelte';	
	import HoverEventCard from '$lib/components/HoverEventCard.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { myEvents } from '$lib/data/myEvents';
	import { myProfile } from '$lib/data/myProfile';

	import type { MyEvent, Event, Profile } from '$lib/data/myTypes';

	import type { PageData } from './$types';	
	
  	export let data: PageData;	

	const registerXyp = async (x_id:string) => {
		
		if (!$myProfile) {
			displayError('Missing user profile!');
			return false;
		}

		if (!x_id) {
			displayError('Missing XyvidPro Event ID!');
			return false;
		}
		
		//# currently the api will 500 if any of these are empty
		// we shouldn't have empty values at this stage since all are required (?) when creating profile but still, brittle	
		let x_body = {			
			events: [ x_id ],
			fname: $myProfile.first_name ? $myProfile.first_name : '.', //# if someday there is a weird bug with a bunch of '.' in data, i am so sorry
			lname: $myProfile.last_name ? $myProfile.last_name : '.',
			company: $myProfile.company ? $myProfile.company : '.',
			email: $myProfile.email ? $myProfile.email : '.',
			location: $myProfile.country ? $myProfile.country : '.',
			joblevel: $myProfile.job_level ? $myProfile.job_level : '.',
			jobtitle: $myProfile.job_title ? $myProfile.job_title : '.',
		}		

		// expected format:
		// x_body = {
		// 	"events": [
		// 		"152109"
		// 	],
		// 	"fname": "Cailen",
		// 	"lname": "Fisher",
		// 	"company": "XYVID",    
		// 	"email": "cfisher@xyvid.com",
		// 	"location": "US",
		// 	"joblevel": "Staff",
		// 	"jobtitle": "Dev"
		// }

		let x_reg = await fetch(xyp_registration_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// 'Accept': '*/*',
				'x-api-key': xyp_api_key
			},
			body: JSON.stringify(x_body),			
		})
		
		if (x_reg.ok) {
			let response = await x_reg.json();
			
			const { error } = await supabase
				.from('attendee')
				.update({ xyp_attnum: response[0].AttendeeID })
				.eq('id', $myProfile.id);

			if (error) {
				displayError('Error updating XYP attnum after event registration!')
				console.error(error);
				return false;
			}
			return true;
		} else {
			displayError('Unknown error completing XYP registration!');
			console.error(x_reg.statusText);
		}						
	}

	const registerEvent = async (event:Event) => {
		disableButton = true;
		setTimeout(() => { disableButton = false }, 3000);
		if (!buttonCheck(cookie)) {
			return false;
		}
		// complete XYP registration first, only update records if success
		if (! await registerXyp(event.xyp_id)) {
			displayError('Error registering with Xyvid Pro');
			return;
		}
		const { data, error } = await supabase
			.from('registration')
			.upsert({ event: event.id, attendee: $myProfile.id })				
			.select();

			if (error) {					
				displayError(error.message);										
			}
			$myEvents = await loadMyEvents($myProfile.id);
			displaySuccess('You are registered! Please check your email for confirmation.');
	}

	let disableButton = false;

	$myProfile = data.myProfile as Profile;
	let { pendingEvents, pastEvents, cookie, xyp_api_key, xyp_portal_url, xyp_registration_url } = data;
    $: ({ pendingEvents, pastEvents } = data);		
</script>

<svelte:head>
	<!-- Open Graph -->
	<meta property="og:description" content="Our Trust in Action webcast series connects senior executives and their teams with the latest thinking on emerging topics in trust and business. The interactive series features distinguished speakers from across business, government and academia.">
	<meta property="og:image" content=""/>
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Trust in Action Webcast series" />
	<meta property="og:locale" content="en_US">
</svelte:head>

<div class="flex flex-row w-full bg-[#dedede] p-0 relative">
	<div class="grow absolute md:relative bottom-1 text-white md:text-black p-6 md:pt-14">
		<span class="text-2xl md:text-4xl block bg-[#2d2d2d] md:bg-transparent">Trust in Action</span>
		<span class="text-md md:text-2xl bg-[#2d2d2d] md:bg-transparent p-2">Webcast series</span>
	</div>
	<div class="w-full md:w-2/3">
		<!-- <img src="/TLI-TIA-Header.png" alt=""> -->
		<img src="header-cropped.png" alt="">
	</div>
</div>
<div id="mainContent" class="justify-center">			
	<div class="w-full flex flex-row space-x-6">
		<div class="grow">
			<h5 class="p-4">
				Our Trust in Action webcast series connects senior executives and their teams with the latest thinking on emerging topics in trust and business. The interactive series features distinguished speakers from across business, government and academia.
			</h5>	
			{#each pendingEvents as event}
			<UpcomingEvent {event} {registerEvent} {disableButton} />
			{/each}
		</div>
		<div class="hidden md:inline w-1/3 bg-[#dedede] p-6">			
			<User {cookie} />
		</div>
	</div>	

	<h2 class="my-12">Past Events</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
		{#each pastEvents as event}
		<HoverEventCard {event} {cookie} {xyp_portal_url} />
		{/each}
	</div>
</div>