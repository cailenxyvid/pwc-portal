<script lang="ts">
	import UpcomingEvent from '$lib/components/UpcomingEvent.svelte';

	import type { PageData } from './$types';

  	export let data: PageData;
	
	let { events } = data;
    $: ({ events } = data);
</script>
    
  
<div class="container h-full mx-auto flex justify-center pt-10 pl-10 border border-secondary-500">
	{#each events as event}
	<UpcomingEvent {event} />
	{/each}
</div>
