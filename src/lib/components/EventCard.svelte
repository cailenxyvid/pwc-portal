<script lang="ts">
    import type { Event } from "$lib/data/myTypes";
    export let event:Event;
</script>

<div class="card p-2 overflow-scroll overflow-ellipsis text-xs">
    <a class="block" href="/event/{event.id}">{event.title}</a>
    <div class="">
        {@html event.content}
    </div>
</div>