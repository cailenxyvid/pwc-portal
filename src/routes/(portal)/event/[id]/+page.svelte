<script lang="ts">
    import type { PageData } from './$types';
    import type { Event } from '$lib/data/myTypes';

    import { myProfile } from '$lib/data/myProfile';

    import { isAlreadyRegistered, buttonCheck } from '$lib/util/validationHelpers';
    import { trackAction } from '$lib/util/trackAction';

    import SocialMedia from '$lib/components/SocialMedia.svelte';
    import CalendarButton from '$lib/components/CalendarButton.svelte';

    export let data: PageData;

    const registerEvent = (event:Event) => {

    }

    // const actionGuide = () => {
    //     if (buttonCheck(cookie)) {
    //         trackAction(cookie ?? '', 'download_action_guide', event.id);
    //         window.open(event.action_guide, '_blank');
    //     } 
    // }

    // const watchNow = async () => {
    //     if (buttonCheck(cookie)) {
    //         await registerEvent(event);
    //         trackAction(cookie ?? '', 'watch_replay', event.id);
    //         window.open(xyp_portal_url + event.xyp_id + '?emailAddress=' + $myProfile.email + '&directEntry=true', '_blank');            
    //     }
    // }

    let { event } = data;    
    let alreadyRegistered = isAlreadyRegistered(event.id);
    let disableButton = false;
</script>

<svelte:head>
	<!-- Open Graph -->
	<meta property="og:description" content="{event.content_meta}">
	<meta property="og:image" content="{event.image_url}"/>
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="{event.title}" />
	<meta property="og:locale" content="en_US">
</svelte:head>

{#if event}
<div class="flex flex-col md:flex-row w-full card rounded-lg">
  <div class="rounded-t-lg md:rounded-none md:rounded-l-lg w-full">
    <img src="{event.image_url}" alt="{event.title}" class="w-full" />
  </div>
  
  <div class="flex flex-col justify-start p-6">
    <h3
      class="mb-2 text-primary-500">
      {event.title}
    </h3>
    <div class="event-date">{new Date(event.event_start).toLocaleString()}</div>
    {#if event.status == 'pending'}
    <div class="border-t border-t-black">
      {event.content_cpe}
    </div>
    <div class="event-register mt-6 mb-4 flex justify-between flex-col md:flex-row gap-1 md:gap-8">
      <SocialMedia />
      {#if alreadyRegistered}
          <span class="btn variant-glass-primary">You are already registered!</span>
          {:else}
          <button disabled={disableButton} class="variant-filled-primary p-2 text-xl w-48 mr-2" on:click={() => { 
              disableButton = true;
              registerEvent(event);
              }}>
              Register
          </button>
      {/if}            
      <span class="relative">
          <CalendarButton {event} />
      </span>            
    </div>  
    {:else}
    <h4 class="text-error-500 my-4">This event does not qualify for CPE credit. </h4>
    <div class="flex justify-between mb-6">
      <button on:click={actionGuide} class="btn text-white {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}" disabled={!event.action_guide}>Action guide</button>
      {#if event.status === "replay"}
      <button on:click={watchNow} class="btn text-white {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}">Watch now</button>
      {/if}        
    </div>
    {/if}
    
    <div class="event-replay-notice font-bold mb-2">
        {#if event.status === 'replay'}
        The live session has concluded. View the webcast replay!
        {/if}
        {#if event.status === 'past'}
        The live session has concluded, and this session is not available for replay.
        {/if}
    </div>
    <span class="mb-4 text-base italic">
        <div class="underline font-extrabold">Featured speakers:</div>
        {@html event.content_speakers}
    </span>
    <p class="prose2 text-sm">
        {#if event.status === 'pending'}
        {@html event.content}
        {:else}
        {@html event.content_replay}
        {/if}
    </p>
  </div>
</div>
{:else}
<div class="text-error-500 text-xl">Error Loading Event</div>
{/if}