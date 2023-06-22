<script lang="ts">
	import type { Event } from '$lib/data/myTypes';

	import ActionGuideButton from './ActionGuideButton.svelte';
	import WatchNowButton from './WatchNowButton.svelte';

	export let event: Event;
	export let cookie: string | undefined;

	let showHover = false;
</script>

<div class="flex flex-col h-full hover:bg-[#dedede] transition-colors p-2">
	<div class="mb-2">
		<a href="/event/{event.id}">
			<img
				src={event.image_url}
				alt=""
				class="w-full"
				style="object-fit: cover; object-position:center"
			/>
		</a>
	</div>
	<div class="flex justify-between mb-4">
		<ActionGuideButton {event} {cookie} />
		{#if event.status === 'replay'}
			<WatchNowButton {event} {cookie} />
		{/if}
	</div>
	<div>
		<a href="/event/{event.id}" class="unstyled text-xl font-bold text-primary-500 hover:no-underline"
			>{event.title}</a
		>
	</div>
	<div class="relative">
		<div class="event-date">
			{#if event.status != 'upcoming'}<div class="text-xs">Previously aired on:</div> {/if}
			<div class="text-sm">
				{new Date(event.event_start).toLocaleString('en-US', {					
					dateStyle: 'full'
				})}
			</div>
		</div>
		<div class="text-small mb-4">
			<!-- TODO: get text-small working with <p> in the data-->
			{@html event.content_speakers}
		</div>
		{#if showHover}
			<div class="absolute rounded-sm shadow-lg bg-[#2d2d2d] text-white p-4 pb-6 top-1 inset-x-4">
				{event.content_meta}
			</div>
		{/if}
	</div>
	
	<div class="text-right w-full mt-auto">
		<button
			class=""
			on:mouseenter={() => {
				showHover = true;
			}}
			on:mouseleave={() => {
				showHover = false;
			}}
		>
			<i class="fa-light fa-circle-plus text-primary-500 text-3xl" />
		</button>
	</div>
</div>
