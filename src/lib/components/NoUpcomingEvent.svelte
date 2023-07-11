<script lang="ts">
	import type { Event } from '$lib/data/myTypes';

	import WatchNowButton from './ActionButtons/WatchNowButton.svelte';
	import ActionGuideButton from './ActionButtons/ActionGuideButton.svelte';
	import SocialMedia from './SocialMedia.svelte';

	export let event: Event;
	export let cookie: string | undefined;
</script>

{#if event}
	<div class="flex flex-col w-full mt-8">
		<div class="event-date border-b-black border-b text-primary-500 text-lg mb-4 mt-2 pb-1">
			Previously aired on:
			{new Date(event.event_start).toLocaleString('en-US', {
				dateStyle: 'full'
			})}
		</div>
		<h3 class="mb-2">
			{event.title}
		</h3>
		<span class="mb-4">
			{@html event.content_speakers}
		</span>
		<div class="w-full">
			<img class="w-full" src={event.image_url} alt={event.title} />
		</div>
		<div class="flex flex-col">
			<div class="event-register mt-2 mb-4 flex flex-row flex-wrap justify-between">
				<div class="border">
					<ActionGuideButton {event} {cookie} />
					{#if event.status === 'replay'}
						<WatchNowButton {event} {cookie} />
					{/if}
				</div>
				<SocialMedia {event} />
			</div>
			<div class="prose2 border-b border-b-black mb-4 pb-8">
				{@html event.content_replay}
			</div>
			<div class="text-sm">
				{@html event.content_cpe}
			</div>
		</div>
	</div>
{:else}
	<div class="text-error-500 text-xl">Error Loading Event</div>
{/if}
