<script lang="ts">
    import { fade } from 'svelte/transition';
        
    import { myEvents, myReplayEvents } from '$lib/data/myEvents';
    import type { Profile } from '$lib/data/myTypes';

    export let profile: Profile;
    
</script>

<div class="rounded-sm p-4" transition:fade>
    <h3>My Events</h3>
    
    {#if $myEvents.length > 0}
    <h4>Upcoming</h4>
        {#each $myEvents as row}
        <div class="text-primary-500 underline">
            <i class="fa fa-play"></i>
            <a href="https://portal12.xyvid.com/{row.event.xyp_id}?emailAddress={profile.email}&directEntry=true">{row.event.title}</a>
        </div>            
        {/each}
    {:else}
        You are not currently registered for any upcoming events.
    {/if}
    
    <h4>Replay</h4>
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
</div>