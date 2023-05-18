<script lang="ts">
    import type { Event } from "$lib/data/myTypes";

    export let event:Event;

    let show = false;
</script>

{#if event.calendar_id}
    <button class="text-xl variant-filled-primary text-white p-2 rounded-sm" on:click={() => { show = !show }}>
        Add to calendar
        <i class="fa-solid fa-chevron-{show ? 'up' : 'down'}"></i>
    </button>
    {#if show}
        <div class="p-6 pl-10 rounded-sm absolute right-0 bg-surface-200">
            <a href="https://www.addevent.com/event/{event.calendar_id}+outlook" class="block">Outlook</a>
            <a href="https://www.addevent.com/event/{event.calendar_id}+google" class="block">Google</a>
            <a href="https://www.addevent.com/event/{event.calendar_id}+apple" class="block">Apple</a>
        </div>
    {/if}
    {:else}
    <div class="text-xl variant-filled-error text-white">Missing calendar link!</div>
{/if}