<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let { event } = data;    
</script>

{#if event}
<div
  class="flex flex-col rounded-lg md:flex-row w-full card">
  <div class="rounded-t-lg md:rounded-none md:rounded-l-lg w-full">
    <img
    src="{event.image_url}"
    alt="{event.title}" />
  </div>
  
  <div class="flex flex-col justify-start p-6">
    <h3
      class="mb-2 text-primary-500">
      {event.title}
    </h3>
    <div class="event-date">{new Date(event.event_start).toLocaleString()}</div>
    <!-- <div class="event-register mt-6 mb-4 flex flex-row">
        {#if alreadyRegistered}
            <span class="test variant-glass-primary">You are already registered!</span>
            {:else}
            <button class="variant-filled-primary p-2 text-xl w-48 mr-2" on:click={() => { registerEvent(event) }}>Register</button>
        {/if}
        <CalendarButton {event} />
    </div> -->
    {#if event.status !== 'pending'}
    <h4 class="text-error-500 my-4">This event does not qualify for CPE credit. </h4>
    {/if}
    
    <div class="event-replay-notice font-bold mb-2">
        {#if event.status === 'replay'}
        The live session has concluded. View the webcast replay!
        {/if}
        {#if event.status === 'past'}
        The live session has concluded, and this session is not available for replay.
        {/if}
    </div>
    <span class="mb-4 text-base italic">
        <div class="underline font-extrabold">Featured speakers:</div>
        {@html event.content_speakers}
    </span>
    <p class="prose2 text-sm">
        {#if event.status === 'pending'}
        {@html event.content}
        {:else}
        {@html event.content_replay}
        {/if}
    </p>
  </div>
</div>
{:else}
<div class="text-error-500 text-xl">Error Loading Event</div>
{/if}