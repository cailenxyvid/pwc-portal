<script lang="ts">
    import type { Event } from "$lib/data/myTypes";
    export let event:Event;
</script>

<div class="card p-2">
    <div class="card-header2">
        <img src="{event.image_url}" alt="{event.title}" class="block w-full h-auto">
        <a href="/event/{event.id}">{event.title}</a>
    </div>    
    <div class="event-speakers italic my-4">
        <div class="underline font-extrabold">Featured speakers:</div>
        {@html event.content_speakers}
    </div>
    <div class="event-replay-notice">
        {#if event.status === 'replay'}
        The live session has concluded. View the webcast replay!
        {/if}
        {#if event.status === 'past'}
        The live session has concluded, and this session is not available for replay.
        {/if}
    </div>
    <div class="event-content">
        <div class="prose">
            {#if event.status === 'pending'}
            {@html event.content}
            {:else}
            {@html event.content_replay}
            {/if}
        </div>        
    </div>
</div>