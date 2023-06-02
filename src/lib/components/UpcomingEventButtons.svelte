<script lang="ts">
    import { supabase } from '$lib/data/supabase';
	import { toastStore } from '@skeletonlabs/skeleton';
    
    import { myProfile } from '$lib/data/myProfile';

    import CalendarButton from "./CalendarButton.svelte";
    
    export let disableButton = false;
    export let alreadyRegistered = false;
    
    const displayError = (message:string) => {
		console.error(message);
		toastStore.trigger({
			message: message,
			background: 'variant-filled-error',
			timeout: 10000
		});
	}

	const displayWarning = (message:string) => {
		console.warn(message);
		toastStore.trigger({
			message: message,
			background: 'variant-filled-warning',
			timeout: 10000
		});
	}

	const displaySuccess = (message:string) => {
		console.log(message);
		toastStore.trigger({
			message: message,
			background: 'variant-filled-success',
			timeout: 10000
		});
	}

    const registerEvent = async (event:Event) => {
		disableButton = true;
		setTimeout(() => { disableButton = false }, 3000);
		if (!$myProfile) {
			displayWarning('Please enter your email to register!');
			return false;
		}
		if (!$myProfile.first_name) {
			displayWarning('Please enter your information to register!');
			return false;
		}
		// complete XYP registration first, only update records if success
		if (! await registerXyp(event.xyp_id)) {
			displayError('Error registering with XYP');
			return;
		}
		const { data, error } = await supabase
			.from('registration')
			.upsert({ event: event.id, attendee: $myProfile.id })				
			.select();

			if (error) {					
				displayError(error.message);										
			}
			$myEvents = await loadMyEvents($myProfile.id);
			displaySuccess('You are registered! Please check your email for confirmation.');
	}

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
</script>
<div class="event-register mt-6 mb-4 flex justify-between flex-col md:flex-row gap-1 md:gap-8">
    {#if alreadyRegistered}
        <span class="btn variant-glass-primary">You are already registered!</span>
        {:else}
        <button disabled={disableButton} class="variant-filled-primary p-2 text-xl w-48 mr-2" on:click={() => { 
            disableButton = true;
            registerEvent(event);
            }}>
            Register
        </button>
        <!-- {#if disableButton}
        <span class="text-error-500">Please enter your information to continue.</span>
        {/if} -->
    {/if}
    <span class="relative">
        <CalendarButton {event} />
    </span>            
</div>