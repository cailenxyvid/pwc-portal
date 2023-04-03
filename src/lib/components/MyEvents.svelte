<script>
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';

    import { myEvents } from '$lib/stores/myEvents';

    let tabSet = 0;
</script>

<div class="bg-secondary-300 rounded-sm p-4">
    <h3>My Events</h3>
    
<TabGroup>
	<Tab bind:group={tabSet} name="tab1" value={0}>Upcoming</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>Replay</Tab>	
	
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			{#each $myEvents as event}
            <div class="bg-primary-200">
                {event.event.title}
            </div>            
            {/each}
		{:else if tabSet === 1}
			(tab panel 2 contents)        
		{/if}
	</svelte:fragment>
</TabGroup>
			
</div>