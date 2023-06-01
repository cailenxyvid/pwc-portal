<script lang="ts">
	import { supabase } from '$lib/data/supabase';
	import { toastStore } from '@skeletonlabs/skeleton';			

	import { loadMyEvents } from '$lib/util/loadMyEvents';

	import User from '$lib/components/User/User.svelte';
	import UpcomingEvent from '$lib/components/UpcomingEvent.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import ExpandingEventCard from '$lib/components/ExpandingEventCard.svelte';
	import HoverEventCard from '$lib/components/HoverEventCard.svelte';

	import { myEvents } from '$lib/data/myEvents';
	import { myProfile } from '$lib/data/myProfile';

	import type { MyEvent, Event } from '$lib/data/myTypes';

	import type { PageData } from './$types';
	
  	export let data: PageData;	

	const displayError = (message:string) => {
		console.error(message);
		toastStore.trigger({
			message: message,
			background: 'variant-filled-error',
			timeout: 10000
		});
	}

	const displayWarning = (message:string) => {
		console.warn(message);
		toastStore.trigger({
			message: message,
			background: 'variant-filled-warning',
			timeout: 10000
		});
	}

	const displaySuccess = (message:string) => {
		console.log(message);
		toastStore.trigger({
			message: message,
			background: 'variant-filled-success',
			timeout: 10000
		});
	}

	//# this function exists in two places. fix that.
	// const loadEvents = async () => {
	// 	// if (!cookie) return;
				
	// 	let { data } = await supabase
	// 		.from("registration")
	// 		.select(`
	// 			attendee,
	// 			event (
	// 				title,
	// 				id,
	// 				xyp_id
	// 			)
	// 			`)
	// 		.eq('attendee', $myProfile.id)
	// 		.eq('event.status', 'pending');
		
	// 	if (data) {
	// 		data = data?.filter(row => row.event != null) //# hack - need to figure out why DB is returning a row when the user has no pending events		
	// 		$myEvents = data as MyEvent[];
	// 	} 
	// 	return data;
	// }

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
		if (!$myProfile) {
			displayWarning('Please enter your email to register!');
			return false;
		}
		if (!$myProfile.first_name) {
			displayWarning('Please enter your information to register!');
			return false;
		}
		// complete XYP registration first, only update records if success
		if (! await registerXyp(event.xyp_id)) {
			displayError('Error registering with XYP');
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


	let disableButton = true;

	let { pendingEvents, pastEvents, cookie, xyp_api_key, xyp_portal_url, xyp_registration_url } = data;
    $: ({ pendingEvents, pastEvents } = data);	
</script>
    
<!-- <div id="demo-hero" class="t h-96 relative">
	<div class="absolute bottom-8 left-8 p-4">
		<h2 class="bg-[#2d2d2d] text-white p-4">Trust Leadership Institute</h2>
		<span class="bg-[#2d2d2d] text-white p-4">It’s time for a new era of leadership</span>		
	</div>
</div> -->


<div class="flex flex-row w-full bg-[#dedede] p-0 pb-12 relative">
	<div class="grow absolute md:relative bottom-1 text-white md:text-black p-6 md:pt-14">
		<span class="text-2xl md:text-4xl block bg-[#2d2d2d] md:bg-transparent">Trust in Action</span>
		<span class="text-md md:text-2xl bg-[#2d2d2d] md:bg-transparent p-2">Webcast series</span>
	</div>
	<div class="bg-primary w-full md:w-2/3 border">
		<!-- <img src="/TLI-TIA-Header.png" alt=""> -->
		<img src="header-cropped.png" alt="">
	</div>
</div>
<div id="mainContent" class="justify-center">			
	<div class="w-full flex flex-row space-x-6">
		<div class="grow">
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
		<!-- <ExpandingEventCard {event} /> -->
		<!-- <EventCard {event} /> -->
		<HoverEventCard {event} />
		{/each}
	</div>

	<div class="mt-12 bg-[#2d2d2d] p-12 flex flex-col md:flex-row justify-between">
		<div class="flex flex-row gap-4">
			<img src="/jonathan-block.jpg" alt="" class="inline h-24">
			<div class="t">
				<h2 class="text-white">Jonathan Block</h2>
				<div class="text-white">Communications and Change Leader, PwC US</div>
			</div>			
		</div>
		<div class="flex flex-row gap-4">
			<img src="/megan-conway.jpg" alt="" class="inline h-24">
			<div class="t">
				<h2 class="text-white">Megan Conway</h2>
				<div class="text-white">Managing Director, Trust Leadership Institute</div>
			</div>			
		</div>
	</div>
</div>