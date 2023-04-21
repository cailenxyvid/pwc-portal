<script lang="ts">
    import type { Event } from "$lib/data/myTypes";
    export let events: Event[];
</script>

{#if events.length > 0}
    {#each events as event}
    <a href="" class="block">{event.title}</a>
    {/each}
    {:else}
    <div class="text-2xl text-error-500">No events found</div>
{/if}