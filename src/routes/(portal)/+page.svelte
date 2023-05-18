<script lang="ts">
	import { supabase } from '$lib/data/supabase';
	import { toastStore } from '@skeletonlabs/skeleton';			

	import UpcomingEvent from '$lib/components/UpcomingEvent.svelte';
	import EventCard from '$lib/components/EventCard.svelte';

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
	const loadEvents = async () => {
		// if (!cookie) return;
				
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
			.eq('attendee', $myProfile.id)
			.eq('event.status', 'pending');
		
		if (data) {
			data = data?.filter(row => row.event != null) //# hack - need to figure out why DB is returning a row when the user has no pending events		
			$myEvents = data as MyEvent[];
		} 
		return data;
	}

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
			await loadEvents();
			displaySuccess('You are registered! Please check your email for confirmation.');
	}


	let { pendingEvents, pastEvents, cookie, xyp_api_key, xyp_portal_url, xyp_registration_url } = data;
    $: ({ pendingEvents, pastEvents } = data);	
</script>
    
<div class="container h-full mx-auto justify-center pt-2 md:pl-10 md:pr-10 relative">	
	<div class="mx-auto w-2/3 mb-4">
		<div style="font-family: georgia, palatino; font-size: 48px; color: rgb(0, 0, 0);" class="text-center">Trust in Action</div>
		Our monthly webcasts provide trust building blocks at the intersection of emerging topics. Listen to diverse perspectives and prepare for the future. *Pick one topic or choose them all. 
	</div>

	<div class="w-full flex flex-col space-x-6 mt-20">
		{#each pendingEvents as event}
		<UpcomingEvent {event} {registerEvent} />
		{/each}
	</div>	

	<h1 class="m-12">Past Events</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
		{#each pastEvents as event}
		<EventCard {event} />
		{/each}
	</div>
</div>