<script lang="ts">
    import type { Event } from "$lib/data/myTypes";

    import { myProfile } from "$lib/data/myProfile";

    import { buttonCheck } from "$lib/util/validationHelpers";
    import { displayWarning } from "$lib/util/displayToast";
    import { trackAction } from "$lib/util/trackAction";

    export let event:Event;
    export let cookie:string;
    export let xyp_portal_url:string;
    export let registerEvent:any;

    const actionGuide = () => {
        if (buttonCheck(cookie)) {
            trackAction(cookie, 'download_action_guide', event.id);
            window.open(event.action_guide, '_blank');
        } 
    }

    const watchNow = async () => {
        if (buttonCheck(cookie)) {
            await registerEvent(event);
            trackAction(cookie, 'watch_replay', event.id);
            window.open(xyp_portal_url + event.xyp_id + '?emailAddress=' + $myProfile.email + '&directEntry=true', '_blank');            
        }
    }
    let showHover = false;
</script>

<div class="block rounded-lg border shadow-sm bg-gray-50 relative">
    {#if showHover}
    <div class="absolute h-1/4 bottom-12 overflow-clip rounded-sm shadow-lg bg-[#dedede] p-4">
        {event.content_meta} 
    </div>
    {/if}
    <div class="overflow-clip h-44">
    <a href="/event/{event.id}">
        <img src="{event.image_url}" alt="" class="h-full w-full" style="object-fit: cover;" />
        </a>
    </div>
    <div class="p-6 mb-20">
        <div class="flex justify-between mb-6">
            <button on:click={actionGuide} class="btn text-white {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}" disabled={!event.action_guide}>Action guide</button>
            {#if event.status === "replay"}
            <button on:click={watchNow} class="btn text-white {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}">Watch now</button>
            {/if}        
        </div>
        <a href="/event/{event.id}" class="text-md">{event.title}</a>
        <p class="mb-4 text-base">
            {@html event.content_speakers}
        </p>    
    </div>
    <div class="text-right align-bottom bottom-0 absolute w-full pr-4 pb-2">
        <button on:mouseenter={()=>{showHover=true}} on:mouseleave={()=>{showHover=false}} on:click={()=>{showHover=!showHover}}>
            <i class="fa-thin fa-circle-plus text-primary-500 p-2 text-2xl"></i>        
        </button>
    </div>
</div>