<script lang="ts">
	import { supabase } from '$lib/data/supabase';
	import { onMount } from 'svelte';

	import UpcomingEvent from '$lib/components/UpcomingEvent.svelte';

	import { myEvents } from '$lib/stores/myEvents';

	import type { PageData } from './$types';

  	export let data: PageData;

	let user_id:any; //#todo - wire in session correctly

	onMount(()=>{
		//loadEvents()
	});

	let loadEvents = async () => {
		let { data } = await supabase
			.from("registration")
			.select(`
				attendee,
				event (
					title
				)
				`)
			.eq('attendee', user_id);
		console.log('loadEvents', data)
		$myEvents = data;
	}

	let registerEvents = async () => {
		if (selectedEvents.length > 0) {
			const {data} = await supabase.auth.getUser();
			user_id = data.user?.id;
			console.log('user', user_id)
			for (let event_id of selectedEvents) {				
				const { data, error } = await supabase
				.from('registration')
				.upsert({ event: event_id, attendee: user_id })
				// .upsert({ event: event_id, attendee: user_id }, { onConflict: 'event, attendee' })
				.select()
			}
			await loadEvents();
		} else {
			//# toast or alert
			console.warn('No events selected!')
		}
	}

	let addEvent = (event_id:string) => {		
		if (!selectedEvents.some(e => e === event_id)) {
			selectedEvents.push(event_id)
   		}
	}

	let removeEvent = (event_id:string) => {
		let index = selectedEvents.indexOf(event_id);		
		if (index >= 0) {
			selectedEvents = selectedEvents.splice(index+1);
		}
		console.log('splice', index, selectedEvents)
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
	let { events } = data;
    $: ({ events } = data);
</script>
    
<div class="container h-full mx-auto justify-center pt-10 pl-10 pr-10 border border-secondary-500">
	<div class="w-full text-center mb-10">
		<button on:click={registerEvents} class="bg-primary-500 rounded-sm p-2 text-xl">Register for selected events</button>
	</div>
	<div class="w-full flex flex-col">
		{#each events as event}
		<UpcomingEvent {event} {toggleEvent} />
		{/each}
	</div>	
</div>
