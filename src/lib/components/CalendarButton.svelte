<script lang="ts">
    import { clickOutside } from "$lib/util/clickOutside";

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
        <div use:clickOutside on:outclick={() => { show = false }} class="p-6 rounded-sm absolute right-0 bg-surface-200">
            <a href="https://www.addevent.com/event/{event.calendar_id}+outlook" target="_blank" class="block">Outlook</a>
            <a href="https://www.addevent.com/event/{event.calendar_id}+google" target="_blank" class="block">Google</a>
            <a href="https://www.addevent.com/event/{event.calendar_id}+apple" target="_blank" class="block">Apple</a>
            {#if event.pwc_calendar_link}
            <a href="{event.pwc_calendar_link}" target="_blank" class="block">PwC Desktop</a>
            {/if}
        </div>
    {/if}
    {:else}
    <div class="text-xl variant-filled-error text-white">Missing calendar link!</div>
{/if}