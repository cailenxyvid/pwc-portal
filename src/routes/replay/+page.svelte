<script lang="ts">
	import ReplayEvent from '$lib/components/ReplayEvent.svelte';

	import type { PageData } from './$types';

  	export let data: PageData;
	
	let { events } = data;
    $: ({ events } = data);
</script>
    
  
<div class="container h-full mx-auto flex justify-center pt-10 pl-10 pr-10 border border-secondary-500">
	{#each events as event}
	<ReplayEvent {event} />
	{/each}
</div>
