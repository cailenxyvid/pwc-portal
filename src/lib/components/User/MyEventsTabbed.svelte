<script lang="ts">
    import { fade } from 'svelte/transition';
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
        
    import { myEvents, myReplayEvents } from '$lib/data/myEvents';
    import type { Profile } from '$lib/data/myTypes';

    export let profile: Profile;

    let tabSet = 0;
</script>

<div class="rounded-sm p-4" transition:fade>
    <h3>My Events</h3>
    
<TabGroup>
	<Tab bind:group={tabSet} name="tab1" value={0}>Upcoming</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>Replay</Tab>	
	
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
            {#if $myEvents.length > 0}
                {#each $myEvents as row}
                <div class="text-primary-500 underline">
                    <i class="fa fa-play"></i>
                    <a href="https://portal12.xyvid.com/{row.event.xyp_id}?emailAddress={profile.email}&directEntry=true">{row.event.title}</a>
                </div>            
                {/each}
            {:else}
                You are not currently registered for any upcoming events.
            {/if}
        {:else if tabSet === 1}
            {#if $myReplayEvents.length > 0}
                {#each $myReplayEvents as row}
                    <div class="text-primary-500 underline">
                        <i class="fa fa-play"></i>                        
                        {row.event.title}
                    </div>            
                {/each}
            {:else}
                You are not registered for any replay events.
            {/if}			
		{/if}
	</svelte:fragment>
</TabGroup>
			
</div>