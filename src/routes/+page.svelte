<script lang="ts">
	import { supabase } from '$lib/data/supabase';
	import { onMount } from 'svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';		

	import UpcomingEvent from '$lib/components/UpcomingEvent.svelte';

	import { myEvents } from '$lib/data/myEvents';

	import type { PageData } from './$types';

  	export let data: PageData;

	let user_id:any; //#todo - wire in session correctly

	onMount(()=>{
		//loadEvents()
		
	// const t: ToastSettings = {
	// 	message: 'This message will have a colorful background.',
	// 	// Provide any utility or variant background style:
	// 	background: 'variant-filled-primary text-white',
	// 	timeout: 10000
	// };

	// toastStore.trigger(t)

	});

	//# this function exists in two places. fix that.
	let loadEvents = async () => {
		let { data } = await supabase
			.from("registration")
			.select(`
				attendee,
				event (
					title,
					id
				)
				`)
			.eq('attendee', user_id);
		
		$myEvents = data; //# todo make Types		
	}

	let registerEvents = async () => {
		if (selectedEvents.length > 0) {
			const {data} = await supabase.auth.getUser();
			user_id = data.user?.id;
			
			for (let event_id of selectedEvents) {				
				const { data, error } = await supabase
				.from('registration')
				.upsert({ event: event_id, attendee: user_id })
				// .upsert({ event: event_id, attendee: user_id }, { onConflict: 'event, attendee' })
				.select()
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
	let enableRegister = false;

	let { events } = data;
    $: ({ events } = data);
	$: enableRegister = (selectedEvents.length > 0);
</script>
    
<div class="container h-full mx-auto justify-center pt-2 pl-10 pr-10">	
	<div class="mx-auto w-2/3 mb-10">
		<div style="font-family: georgia, palatino; font-size: 72px; color: rgb(0, 0, 0);" class="text-center">Trust in Action</div>
		Our monthly webcasts provide trust building blocks at the intersection of emerging topics. Listen to diverse perspectives and prepare for the future. *Pick one topic or choose them all. 
	</div>
	<div class="w-full text-center mb-10">
		<button on:click={registerEvents} disabled={!enableRegister} class="{enableRegister ? 'bg-primary-500' : 'bg-primary-100'} text-white rounded-sm p-2 text-xl">Register for selected events</button>
	</div>
	<div class="w-full flex flex-col md:flex-row space-x-6">
		{#each events as event}
		<UpcomingEvent {event} {toggleEvent} />
		{/each}
	</div>	
</div>
