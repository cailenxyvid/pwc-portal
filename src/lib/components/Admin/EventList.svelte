<script lang="ts">
    import type { Event } from "$lib/data/myTypes";
    export let events: Event[];
</script>

{#if events.length > 0}
    {#each events as event}
    <div class="p-2 mb-1">
        <a href="/xyp/event/{event.id}" class="bg-surface-500 shadow-lg p-2 rounded-md">
            <button><i class="fa fa-pencil"></i></button>
        </a>
        <span class="text-xl text-primary-500">{event.title}</span>        
    </div>
    {/each}
    {:else}
    <div class="text-2xl text-error-500">No events found</div>
{/if}