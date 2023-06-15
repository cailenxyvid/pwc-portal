<script lang="ts">
    import { supabase } from '$lib/data/supabase';

    import type { PageData } from './$types';
    import type { Event } from '$lib/data/myTypes';

    import { myProfile } from '$lib/data/myProfile';
    import { myEvents } from '$lib/data/myEvents';    	
    import { loadMyEvents } from '$lib/util/loadMyEvents';

    import { isAlreadyRegistered, buttonCheck } from '$lib/util/validationHelpers';
    import { trackAction } from '$lib/util/trackAction';
    import { displayError, displayWarning, displaySuccess } from '$lib/util/displayToast';

    import SocialMedia from '$lib/components/SocialMedia.svelte';
    import CalendarButton from '$lib/components/CalendarButton.svelte';
    import User from '$lib/components/User/User.svelte';

    export let data: PageData;

    const registerXyp = async (x_id:string) => {
		
		if (!$myProfile) {
			displayError('Missing user profile!');
			return false;
		}

		if (!x_id) {
			displayError('Missing XyvidPro Event ID!');
			return false;
		}
		
		//# currently the api will 500 if any of these are empty
		// we shouldn't have empty values at this stage since all are required (?) when creating profile but still, brittle	
		let x_body = {			
			events: [ x_id ],
			fname: $myProfile.first_name ? $myProfile.first_name : '.', //# if someday there is a weird bug with a bunch of '.' in data, i am so sorry
			lname: $myProfile.last_name ? $myProfile.last_name : '.',
			company: $myProfile.company ? $myProfile.company : '.',
			email: $myProfile.email ? $myProfile.email : '.',
			location: $myProfile.country ? $myProfile.country : '.',
			joblevel: $myProfile.job_level ? $myProfile.job_level : '.',
			jobtitle: $myProfile.job_title ? $myProfile.job_title : '.',
		}		

		// expected format:
		// x_body = {
		// 	"events": [
		// 		"152109"
		// 	],
		// 	"fname": "Cailen",
		// 	"lname": "Fisher",
		// 	"company": "XYVID",    
		// 	"email": "cfisher@xyvid.com",
		// 	"location": "US",
		// 	"joblevel": "Staff",
		// 	"jobtitle": "Dev"
		// }

		let x_reg = await fetch(xyp_registration_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// 'Accept': '*/*',
				'x-api-key': xyp_api_key
			},
			body: JSON.stringify(x_body),			
		})
		
		if (x_reg.ok) {
			let response = await x_reg.json();
			
			const { error } = await supabase
				.from('attendee')
				.update({ xyp_attnum: response[0].AttendeeID })
				.eq('id', $myProfile.id);

			if (error) {
				displayError('Error updating XYP attnum after event registration!')
				console.error(error);
				return false;
			}
			return true;
		} else {
			displayError('Unknown error completing XYP registration!');
			console.error(x_reg.statusText);
		}						
	}

	const registerEvent = async (event:Event) => {
		if (isAlreadyRegistered(event.id)) {			
			return;
		} 		
		disableButton = true;
		setTimeout(() => { disableButton = false }, 3000);
		if (!buttonCheck(cookie)) {
			return false;
		}
		// complete XYP registration first, only update records if success
		if (! await registerXyp(event.xyp_id)) {
			displayError('Error registering with Xyvid Pro');
			return;
		}
		const { data, error } = await supabase
			.from('registration')
			.upsert({ event: event.id, attendee: $myProfile.id }) //# upsert not working as expected, figure out correct syntax (it allows dups)
			.select();

			if (error) {					
				displayError(error.message);										
			}
			$myEvents = await loadMyEvents($myProfile.id);
      alreadyRegistered = isAlreadyRegistered(event.id);
			displaySuccess('You are registered!');
	}

    const actionGuide = () => {
        if (buttonCheck(cookie)) {
            trackAction(cookie ?? '', 'download_action_guide', event.id);
            window.open(event.action_guide, '_blank');
        } 
    }

    const watchNow = async () => {
        if (buttonCheck(cookie)) {
            await registerEvent(event);
            trackAction(cookie ?? '', 'watch_replay', event.id);
            window.open(xyp_portal_url + event.xyp_id + '?emailAddress=' + $myProfile.email + '&directEntry=true', '_blank');            
        }
    }

    let { event, cookie, xyp_portal_url, xyp_api_key, xyp_registration_url  } = data;    
    let alreadyRegistered = isAlreadyRegistered(event.id);
    let disableButton = false;
</script>

{#if event}
<div class="flex flex-col md:flex-row w-full card rounded-lg">      
  <div class="flex flex-col justify-start p-6">
    <div class="text-lg p-1 mb-2">
      <a href="/" class="text-black no-underline" style="color: black; text-decoration: none;">
        <i class="fa-solid fa-turn-down-left"></i>
        Return to Webcast Library
      </a>
    </div>
    <div class="rounded-t-lg md:rounded-none md:rounded-l-lg w-full">
      <img src="{event.image_url}" alt="{event.title}" class="w-full" />
    </div>
    <h3
      class="mb-2 text-primary-500">
      {event.title}
    </h3>
    <div class="event-date">{new Date(event.event_start).toLocaleString()}</div>
    {#if event.status == 'pending'}
    <div class="border-t border-t-black">
      {@html event.content_cpe}
    </div>
    <div class="event-register mt-6 mb-4 flex justify-between flex-col md:flex-row gap-1 md:gap-8">
      <SocialMedia {event} />
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
    {#if event.status === "replay"}<h4 class="text-error-500 my-4">This event does not qualify for CPE credit. </h4>{/if}
    <div class="flex justify-between mb-6">
      <button on:click={actionGuide} class="btn text-white {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}" disabled={!event.action_guide}>Action guide</button>
      {#if event.status === "replay"}
      <button on:click={watchNow} class="btn text-white {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}">Watch now</button>
      {/if}        
    </div>
    <div class="mb-4">
      <SocialMedia {event} />
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
  <div class="hidden md:inline w-1/3 bg-[#dedede] p-6">			
    <User {cookie} />
  </div>
</div>
{:else}
<div class="text-error-500 text-xl">Error Loading Event</div>
{/if}