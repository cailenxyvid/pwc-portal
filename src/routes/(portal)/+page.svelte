<script lang="ts">
	import { supabase } from '$lib/data/supabase';
	import { toastStore } from '@skeletonlabs/skeleton';			

	import UpcomingEvent from '$lib/components/UpcomingEvent.svelte';

	import { myEvents } from '$lib/data/myEvents';
	import { myProfile } from '$lib/data/myProfile';
	import type { MyEvent } from '$lib/data/myTypes';

	import type { PageData } from './$types';
	

  	export let data: PageData;

	let user_id: string;

	//# this function exists in two places. fix that.
	let loadEvents = async () => {
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
			.eq('event.status', 'pending');
		
		if (data) {
			data = data?.filter(row => row.event != null) //# hack - need to figure out why DB is returning a row when the user has no pending events		
			$myEvents = data as MyEvent[];												
		} 
		return data;
	}

	let registerXyp = async () => {
		
		if (!$myProfile) {
				console.error('Missing user profile!');
				return false;
		}
		
		// get xyvid event ids						
		let x_ids = selectedEvents.map((id) => {
			const event = events?.find((event) => event.id == id);			
			return event ? event.xyp_id : null;
		});

		//# currently the api will 500 if any of these are empty
		// we shouldn't have empty values at this stage since all are required (?) when creating profile but still, brittle	
		let x_body = {
			// events: [ "152119" ],
			events: x_ids,
			fname: $myProfile.first_name ? $myProfile.first_name : '.', //# if someday there is a weird bug with a bunch of '.' in data, i am so sorry
			lname: $myProfile.last_name ? $myProfile.last_name : '.',
			company: $myProfile.company ? $myProfile.company : '.',
			email: $myProfile.email ? $myProfile.email : '.',
			location: $myProfile.country ? $myProfile.country : '.',
			joblevel: $myProfile.job_level ? $myProfile.job_level : '.',
			jobtitle: $myProfile.job_title ? $myProfile.job_title : '.',
		}		

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
				.eq('id', cookie);

			if (error) {
				console.error('Error updating attnum after event registration!', error)
				return false;
			}
			return true;
		} else {
			console.error("Error completing XYP registration!", x_reg.statusText);
		}						
	}

	let registerEvents = async () => {
		if (!cookie) { return; }
		if (selectedEvents.length > 0) {			
			user_id = cookie;

			// complete XYP registration first, only update records if success
			if (!registerXyp()) {
				console.error('Error registering with XYP');
				return;
			}				
			
			for (let event_id of selectedEvents) {				
				const { data, error } = await supabase
				.from('registration')
				.upsert({ event: event_id, attendee: user_id })
				// .upsert({ event: event_id, attendee: user_id }, { onConflict: 'event, attendee' })
				.select();

				if (error) {
					console.error(error.message);
					toastStore.trigger({
						message: error.message,
						background: 'variant-filled-error text-white',
						timeout: 10000
					});
				}
			}
			await loadEvents();
			selectedEvents = [];
			toastStore.trigger({
				message: 'You are registered! Please check your email for confirmation.',
				background: 'variant-filled-success text-white',
				timeout: 10000
			});
		} else {			
			toastStore.trigger({
				message: 'No Events selected!',
				background: 'variant-filled-warning',
			});
		}
	}

	let addEvent = (event_id:string) => {		
		if (!selectedEvents.some(e => e === event_id)) {
			selectedEvents.push(event_id)
			selectedEvents = selectedEvents;			
   		}		  
	}

	let removeEvent = (event_id:string) => {
		let index = selectedEvents.indexOf(event_id);		
		if (index >= 0) {
			selectedEvents = selectedEvents.splice(index+1);
		}		
	}

	let toggleEvent = (e:any) => {
		let event_id = e.target.value;
		if (e.target.checked) {
			addEvent(event_id);
		} else {
			removeEvent(event_id)
		}
	}

	let selectedEvents:string[] = [];
	let enableRegister: string | undefined | boolean = false;

	let { events, cookie, xyp_api_key, xyp_portal_url, xyp_registration_url } = data;
    $: ({ events } = data);
	$: enableRegister = (selectedEvents.length > 0 && cookie);
	// $: events = events as Event[];
</script>
    
<div class="container h-full mx-auto justify-center pt-2 md:pl-10 md:pr-10 relative">	
	<div class="mx-auto w-2/3 mb-4">
		<div style="font-family: georgia, palatino; font-size: 48px; color: rgb(0, 0, 0);" class="text-center">Trust in Action</div>
		Our monthly webcasts provide trust building blocks at the intersection of emerging topics. Listen to diverse perspectives and prepare for the future. *Pick one topic or choose them all. 
	</div>
	<div class="w-full text-center mb-10 absolute">		
		<button on:click={registerEvents} disabled={!enableRegister} class="{enableRegister ? 'bg-primary-500' : 'bg-primary-400'} text-white rounded-sm p-2 text-xl">Register for selected events</button>
	</div>
	<div class="w-full flex flex-col md:flex-row space-x-6 mt-20">
		{#each events as event}
		<UpcomingEvent {event} {toggleEvent} />
		{/each}
	</div>	
</div>