<script lang="ts">
    export let event: any;
</script>

{#if event}
<div class="w-full">
    <div class="event-title text-primary-500 text-2xl">{event.title}</div>
    <div class="event-date">{new Date(event.event_start).toLocaleString()}</div>   
    <div class="event-content">{@html event.content}</div>
</div>
{:else}
<div class="text-error-500 text-xl">Error Loading Event</div>
{/if}