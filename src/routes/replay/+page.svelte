<script lang="ts">
	import ReplayEvent from '$lib/components/ReplayEvent.svelte';

	import type { PageData } from './$types';

  	export let data: PageData;
	
	let { events } = data;
    $: ({ events } = data);
</script>
    
  
<div class="container h-full mx-auto justify-center pt-10 pl-10 pr-10 space-y-12">
	{#each events as event}
	<ReplayEvent {event} />
	{/each}
</div>
