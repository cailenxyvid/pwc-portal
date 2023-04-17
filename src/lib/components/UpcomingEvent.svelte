<script lang="ts">
    import type { Event } from "$lib/data/myTypes";
    import { myEvents } from "$lib/data/myEvents";

    import CalendarButton from "./CalendarButton.svelte";

    export let event: Event;
    export let toggleEvent: any;

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
    <div class="event-register mt-6 mb-4">
        <label class="inline-flex items-center">
            <input on:change={toggleEvent} value={event.id} checked={alreadyRegistered} disabled={alreadyRegistered} type="checkbox" class="w-8 h-8 text-primary-500" />
            <span class="ml-2">{alreadyRegistered ? 'You are registered!' : 'Select this event'}</span>
          </label>
    </div>
    <div class="event-content">        
        {@html event.content}
        <!-- <Accordion>
            <AccordionItem>
                <svelte:fragment slot="lead">(icon)</svelte:fragment>
                <svelte:fragment slot="summary">Read more</svelte:fragment>
                <svelte:fragment slot="content">
                    {@html event.content}
                </svelte:fragment>
            </AccordionItem>
        </Accordion> -->
    </div>    
</div>


{:else}
<div class="text-error-500 text-xl">Error Loading Event</div>
{/if}