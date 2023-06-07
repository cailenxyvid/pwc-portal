<script lang="ts">
    import type { Event } from "$lib/data/myTypes";

    import { buttonCheck } from "$lib/util/validationHelpers";
    import { displayWarning } from "$lib/util/displayToast";

    export let event:Event;
    export let cookie:string|undefined;
    export let xyp_portal_url:string;

    const actionGuide = () => {
        if (buttonCheck(cookie)) {
            window.open(event.action_guide, '_blank');
        } 
    }

    const watchNow = () => {
        if (buttonCheck(cookie)) {
            window.open(xyp_portal_url + event.xyp_id, '_blank');            
        }
    }
    let showHover = false;
</script>
<!-- {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'} -->
<!-- <div class="block rounded-lg card card-hover relative max-h-[30rem] overflow-clip"> -->
<div class="rounded-lg card card-hover flex flex-col">    
    <div class="overflow-clip h-44">
        <a href="/event/{event.id}">
            <img src="{event.image_url}" alt="" class="h-full w-full" style="object-fit: cover;" />
        </a>
    </div>
    <div class="p-6 grow">
        <div class="flex justify-between mb-6">
            <button class="btn text-white {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}" on:click={actionGuide}>Action guide</button>
            {#if event.status === "replay"}
            <button class="btn text-white {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}" on:click={watchNow}>Watch now</button>
            {/if}        
        </div>
        <a href="/event/{event.id}" class="text-md">{event.title}</a>
        <p class="mb-4 text-base">
            {@html event.content_speakers}
        </p>    
    </div>
    <div class="card-footer self-end">
        <!-- {#if showHover}
        <div class="absolute h-36 w-full rounded-sm bg-[#dedede] p-4 overflow-hidden right-10 z-[9999]">
            {#if event.status === "pending"}
            {@html event.content}
            {:else}
            {@html event.content_replay}
            {/if}        
        </div>
        {/if} -->
        <div class="text-right align-bottom bottom-0 w-full pr-4 pb-2 self-end">
            <i class="fa-thin fa-circle-plus text-primary-500 p-2 text-2xl hidden md:inline" title="{event.content_replay}"></i>  
            <!-- <button on:mouseenter={()=>{showHover=true}} on:mouseleave={()=>{showHover=false}} on:click={()=>{showHover=!showHover}}>
                <i class="fa-thin fa-circle-plus text-primary-500 p-2 text-2xl"></i>        
            </button> -->
        </div>
    </div>    
</div>