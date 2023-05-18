<script lang="ts">
    import type { Event } from "$lib/data/myTypes";
    import { myEvents } from "$lib/data/myEvents";

    import CalendarButton from "./CalendarButton.svelte";

    export let event: Event;
    export let registerEvent: any;

    let alreadyRegistered = false;
    $: if ($myEvents.length > 0) { alreadyRegistered = $myEvents.some(e => event.id == e.event.id) }
</script>

{#if event}
<div class="w-full card p-4 shadow-lg">
    <div class="event-title text-primary-500 text-2xl">{event.title}</div>
    <div class="event-date">{new Date(event.event_start).toLocaleString()}</div>
    <div class="event-calendar mt-4 mb-4">
        <CalendarButton {event} />
    </div>    
    <div class="event-register mt-6 mb-4 inline-flex items-center">
        <button class="variant-filled-primary p-2 text-xl" on:click={() => { registerEvent(event) }}>Register</button>
    </div>
    <div class="event-speakers">
        {@html event.content_speakers}
    </div>
    <div class="event-content">        
        {@html event.content}        
    </div>    
</div>


{:else}
<div class="text-error-500 text-xl">Error Loading Event</div>
{/if}