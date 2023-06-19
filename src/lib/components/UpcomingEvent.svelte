<script lang="ts">
	import type { Event } from '$lib/data/myTypes';
	import { myEvents } from '$lib/data/myEvents';

	import CalendarButton from './CalendarButton.svelte';
	import SocialMedia from './SocialMedia.svelte';

	export let event: Event;
	export let registerEvent: any;

	export let disableButton = false;
	let alreadyRegistered = false;
	$: if ($myEvents.length > 0) {
		alreadyRegistered = $myEvents.some((e) => event.id == e.event.id);
	} else {
		alreadyRegistered = false;
	}
</script>

{#if event}
	<div class="flex flex-col w-full mt-8 px-6">
		<div class="event-date border-b-black border-b text-primary-500 text-lg mb-4 mt-2 pb-1">
			Up next: {new Date(event.event_start).toLocaleString('en-US', {
				timeStyle: 'short',
				dateStyle: 'full'
			})} ET
		</div>
		<h3 class="mb-2">
			{event.title}
		</h3>
		<span class="mb-4">
			<!-- <div class="underline font-extrabold">Featured speakers:</div> -->
			{@html event.content_speakers}
		</span>
		<div class="w-full">
			<img class="w-full" src={event.image_url} alt={event.title} />
		</div>
		<div class="flex flex-col">
			<div class="event-register mt-2 mb-4 flex flex-row flex-wrap justify-between">
				<div>
					{#if alreadyRegistered}
						<span class="btn variant-glass-primary">Registration saved</span>
					{:else}
						<button
							disabled={disableButton}
							class="btn bg-primary-500 text-white mr-4 mb-2"
							on:click={() => {
								disableButton = true;
								registerEvent(event);
							}}
						>
							Register
						</button>
						<!-- {#if disableButton}
					<span class="text-error-500">Please enter your information to continue.</span>
					{/if} -->
					{/if}
					<CalendarButton {event} />
				</div>
				<SocialMedia {event} />
			</div>
			<div class="prose2 border-b border-b-black mb-4 pb-8">
				{@html event.content}
			</div>
			<div class="text-sm">
				{@html event.content_cpe}
			</div>
		</div>
	</div>
{:else}
	<div class="text-error-500 text-xl">Error Loading Event</div>
{/if}
<!-- {#if event}
<div class="w-full card p-4 shadow-lg">
    <div class="event-title text-primary-500 text-2xl">{event.title}</div>
    <div class="event-date">{new Date(event.event_start).toLocaleString()}</div>
    <div class="event-calendar mt-4 mb-4">
        <CalendarButton {event} />
    </div>    
    <div class="event-register mt-6 mb-4 inline-flex items-center">
        <button class="variant-filled-primary p-2 text-xl" on:click={() => { registerEvent(event) }}>Register</button>
    </div>
    <div class="event-speakers">
        {@html event.content_speakers}
    </div>
    <div class="event-content">        
        {@html event.content}        
    </div>    
</div>
{:else}
<div class="text-error-500 text-xl">Error Loading Event</div>
{/if} -->
