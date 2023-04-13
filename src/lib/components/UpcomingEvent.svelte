<script lang="ts">
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    import { myEvents } from "$lib/data/myEvents";

    export let event: any;
    export let toggleEvent: any;

    let alreadyRegistered = false;
    $: if ($myEvents.length > 0) { console.log('reactive myevents count', $myEvents); alreadyRegistered = $myEvents.some(e => event.id == e.event.id) }
</script>

{#if event}
<div class="w-full card p-4">
    <div class="event-title text-primary-500 text-2xl">{event.title}</div>
    <div class="event-date">{new Date(event.event_start).toLocaleString()}</div>
    <div class="event-calendar">
        <button class="bg-primary-500 rounded-sm p-2 mb-4 mt-4 text-white">
            <i class="fa fa-calendar"></i>
            Add to Calendar
        </button>
    </div>
    <div class="event-register">
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