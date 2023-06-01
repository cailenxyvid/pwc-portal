<script lang="ts">
    import type { Event } from "$lib/data/myTypes";
    export let event:Event;
    let showHover = false;
</script>
<!-- {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'} -->
<!-- <div class="block rounded-lg card card-hover relative max-h-[30rem] overflow-clip"> -->
<div class="block rounded-lg card card-hover relative">
    {#if showHover}
    <div class="absolute h-full w-full rounded-sm bg-[#dedede]">
        {#if event.status === "pending"}
        {@html event.content}
        {:else}
        {@html event.content_replay}
        {/if}        
    </div>
    {/if}
    <div class="overflow-clip h-44">
    <a href="/event/{event.id}">
        <img src="{event.image_url}" alt="" class="h-full w-full" style="object-fit: cover;" />
        </a>
    </div>
    <div class="p-6">
    <div class="flex justify-between">
        {#if event.status === "replay"}
        <button class="btn text-white {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}">Watch now</button>
        {/if}
        <button class="btn text-white {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}">Action guide</button>
        </div>
        <a href="/event/{event.id}" class="text-md mt-2">{event.title}</a>
        <p class="mb-4 text-base">
            {@html event.content_speakers}
        </p>    
    </div>
    <div class="text-right grow align-bottom bottom-0 absolute w-full pr-4 pb-2">
        <button on:mouseenter={()=>{showHover=true}} on:mouseleave={()=>{showHover=false}} on:click={()=>{showHover=!showHover}}>
            <i class="fa-thin fa-circle-plus text-primary-500 p-2 text-2xl"></i>        
        </button>
    </div>
</div>