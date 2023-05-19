<script lang="ts">
    import type { Event } from "$lib/data/myTypes";
    export let event:Event;
</script>

<div
  class="block rounded-lg card card-hover {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}">
  <div class="t h-48 overflow-clip">
    <a href="/event/{event.id}">
        <img src="{event.image_url}" alt="" class="w-full" />
      </a>
  </div>
  <div class="p-6">
    <a href="/event/{event.id}" class="text-2xl" style="color: #fff;">{event.title}</a>
    <p class="mb-4 text-base text-white">
      {@html event.content_speakers}
    </p>    
  </div>
</div>