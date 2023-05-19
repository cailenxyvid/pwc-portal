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
<div class="flex flex-col md:flex-row w-full card bg-white">
    <!-- <img class="w-full rounded-t-lg md:w-2/4 md:rounded-none md:rounded-l-lg" src="{event.image_url}" alt="{event.title}" /> -->
    <!-- idk wtf the deal is here -->
    <div class="w-full">        
        <img class="w-full" src="{event.image_url}" alt="{event.title}" />
    </div>
    <div class="flex flex-col justify-start p-6">
        <h3 class="mb-2 text-primary-500">
            {event.title}
        </h3>
        <div class="event-date">{new Date(event.event_start).toLocaleString()}</div>
        <div class="event-register mt-6 mb-4 flex flex-row">
            {#if alreadyRegistered}
                <span class="btn variant-glass-primary">You are already registered!</span>
                {:else}
                <button class="variant-filled-primary p-2 text-xl w-48 mr-2" on:click={() => { registerEvent(event) }}>Register</button>
            {/if}
            <span class="relative card">
                <CalendarButton {event} />
            </span>            
        </div>
        <span class="mb-4 text-base italic">
            <div class="underline font-extrabold">Featured speakers:</div>
            {@html event.content_speakers}
        </span>
        <p class="prose2 text-sm">
        {@html event.content}
        </p>
  </div>
</div>
{:else}
<div class="text-error-500 text-xl">Error Loading Event</div>
{/if}
<!-- {#if event}
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
{/if} -->