<script lang="ts">
    export let event: any;
</script>

{#if event}
<div class="w-full">
    <div class="event-title text-primary-500 text-2xl">{event.title}</div>
    <div class="event-date">{new Date(event.event_start).toLocaleString()}</div>
    <div class="event-register">
        <label class="inline-flex items-center">
            <input type="checkbox" class="w-8 h-8 text-primary-500"  />
            <span class="ml-2">Select this event</span>
          </label>
    </div>
    <div class="event-content">{@html event.content}</div>
    <div class="event-calendar">
        <button class="bg-primary-500 rounded-sm p-2">
            <i class="fa fa-calendar"></i>
            Add to Calendar
        </button>
    </div>
</div>
{:else}
<div class="text-error-500 text-xl">Error Loading Event</div>
{/if}