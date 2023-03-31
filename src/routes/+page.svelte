<script lang="ts">
	import UpcomingEvent from '$lib/components/UpcomingEvent.svelte';

	import type { PageData } from './$types';

  	export let data: PageData;
	
	let { events } = data;
    $: ({ events } = data);
</script>
    
<div class="container h-full mx-auto justify-center pt-10 pl-10 pr-10 border border-secondary-500">
	<div class="w-full text-center mb-2">
		<button class="bg-primary-500 rounded-sm p-2 text-xl">Register for selected events</button>
	</div>
	<div class="w-full flex sm:flex-col md:flex-row">
		{#each events as event}
		<UpcomingEvent {event} />
		{/each}
	</div>	
</div>
