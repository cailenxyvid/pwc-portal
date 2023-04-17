<script lang="ts">
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    import { myEvents } from "$lib/data/myEvents";

    export let event: any;
    export let toggleEvent: any;

    let alreadyRegistered = false;
    $: if ($myEvents.length > 0) { alreadyRegistered = $myEvents.some(e => event.id == e.event.id) }
</script>

{#if event}
<div class="w-full card p-4 shadow-lg">
    <div class="event-title text-primary-500 text-2xl">{event.title}</div>
    <div class="event-date">{new Date(event.event_start).toLocaleString()}</div>
    <div class="event-calendar mt-4 mb-4">
        <!-- <a href="https://www.addevent.com/event/pq16740271+outlook">
            <button class="bg-primary-500 rounded-sm p-2 mb-4 mt-4 text-white">
                <i class="fa fa-calendar"></i>
                Add to Calendar
            </button>
        </a> -->

        <!-- addevent.com widget - looks like we can't override styles without breaking functionality  -->
        <a title="Add to Calendar" class="addeventatc" data-id="pq16740271" href="https://www.addevent.com/event/pq16740271" target="_blank">Add to Calendar</a>
        <script type="text/javascript" src="https://cdn.addevent.com/libs/atc/1.6.1/atc.min.js" async defer></script>
        <!-- we should probably do a custom dropdown button instead -->
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