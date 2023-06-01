<script lang="ts">
    import type { Event } from "$lib/data/myTypes";
    import { myEvents } from "$lib/data/myEvents";

    import CalendarButton from "./CalendarButton.svelte";

    export let event: Event;
    export let registerEvent: any;

    export let disableButton = false;
    let alreadyRegistered = false;
    $: if ($myEvents.length > 0) { alreadyRegistered = $myEvents.some(e => event.id == e.event.id) } else { alreadyRegistered = false }
</script>

{#if event}
<div class="flex flex-col w-full card bg-white mt-8 px-6">
    <div class="event-date border-b-black border-b text-primary-500 mb-4 mt-2">Up next: {new Date(event.event_start).toLocaleString()} ET</div>
    <h3 class="mb-2">
        {event.title}
    </h3> 
    <span class="mb-4 text-base italic">
        <!-- <div class="underline font-extrabold">Featured speakers:</div> -->
        {@html event.content_speakers}
    </span>
    <div class="w-full">        
        <img class="w-4/5" src="{event.image_url}" alt="{event.title}" />
    </div>
    <div class="flex flex-col justify-start p-6">               
        <div class="event-register mt-6 mb-4 flex justify-between flex-row gap-8">
            {#if alreadyRegistered}
                <span class="btn variant-glass-primary">You are already registered!</span>
                {:else}
                <button disabled={disableButton} class="variant-filled-primary p-2 text-xl w-48 mr-2" on:click={() => { 
                    disableButton = true;
                    registerEvent(event);
                    }}>Register</button>
            {/if}
            <span class="relative card">
                <CalendarButton {event} />
            </span>            
        </div>        
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