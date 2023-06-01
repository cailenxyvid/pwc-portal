<script lang="ts">
    import type { Event } from "$lib/data/myTypes";
    export let event:Event;
</script>
<!-- {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'} -->
<div
  class="block rounded-lg card card-hover relative max-h-[10rem] overflow-clip">
  <div class="t h-48 overflow-clip">
    <a href="/event/{event.id}">
        <img src="{event.image_url}" alt="" class="w-full" />
      </a>
  </div>
  <div class="p-6">
    <div class="t justify-between">
        {#if event.status === "replay"}
        <button class="btn {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}">Watch now</button>
        {/if}
        <button class="btn {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}">Action guide</button>
      </div>
    <a href="/event/{event.id}" class="text-md absolute bottom-0 bg-[#2d2d2d]">{event.title}</a>
    <p class="mb-4 text-base">
      {@html event.content_speakers}
    </p>    
  </div>
  <div class="t text-right grow align-bottom bottom-0 absolute">
    <button>
        <i class="fa fa-circle-plus"></i>
    </button>
  </div>
</div>