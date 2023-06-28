<script lang="ts">
	import type { PageData } from './$types';

	import User from '$lib/components/User/User.svelte';
	import SocialMedia from '$lib/components/SocialMedia.svelte';
	import CalendarButton from '$lib/components/ActionButtons/CalendarButton.svelte';
	import RegisterButton from '$lib/components/ActionButtons/RegisterButton.svelte';
	import ActionGuideButton from '$lib/components/ActionButtons/ActionGuideButton.svelte';
	import WatchNowButton from '$lib/components/ActionButtons/WatchNowButton.svelte';
	import CreateProfile from '$lib/components/User/CreateProfile.svelte';

	export let data: PageData;

	let { event, cookie } = data;
</script>

<svelte:head>
	<!-- Open Graph -->
	<meta property="og:description" content={event.content_meta} />
	<meta property="og:image" content={event.image_url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={event.title} />
	<meta property="og:title" content={event.title} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:url" content="//tli.xyvid.com/event/{event.id}" />

	<!-- HTML Meta Tags -->
	<title>{event.title}</title>
	<meta name="description" content={event.content_meta} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="//tli.xyvid.com" />
	<meta property="twitter:url" content="//tli.xyvid.com/event/{event.id}" />
	<meta name="twitter:title" content={event.title} />
	<meta name="twitter:description" content={event.content_meta} />
	<meta name="twitter:image" content={event.image_url} />
	<!-- # dynamic url capturing doesn't work here, need SSR solution -->
</svelte:head>

{#if event}
	<div class="flex flex-col md:flex-row w-full">
		<div class="flex flex-col justify-start p-8 md:p-16">
			<div class="p-1 mb-4">
				<a href="/" class="unstyled hover:text-primary-500">
					<i class="fa-solid fa-turn-down-left" />
					Return to Webcast Library
				</a>
			</div>
			<div class="event-replay-notice font-bold mb-4">
				{#if event.status === 'replay'}
					<h4 class="text-error-500">This event does not qualify for CPE credit.</h4>
					<div>The live session has concluded. View the webcast replay!</div>
				{/if}
				{#if event.status === 'past'}
					The live session has concluded, and this session is not available for replay.
				{/if}
			</div>
			<div class="w-full mb-2">
				<img src={event.image_url} alt={event.title} class="w-full" />
			</div>
			<div class="event-register mt-2 mb-4 flex flex-row flex-wrap justify-between">
				{#if event.status !== 'pending'}
					<div>
						<ActionGuideButton {event} {cookie} />
						{#if event.status === 'replay'}
							<WatchNowButton {event} {cookie} />
						{/if}
					</div>
				{:else}
					<div class="relative">
						<RegisterButton {event} {cookie} />
						<CalendarButton {event} />
					</div>
				{/if}
				<SocialMedia {event} />
			</div>
			<div class="text-2xl mb-2 text-primary-500">
				{event.title}
			</div>
			<div class="event-date mb-4">
				{#if event.status !== 'pending'}
					Previously aired on:
					{new Date(event.event_start).toLocaleString('en-US', {
						dateStyle: 'full'
					})}
				{:else}
					{new Date(event.event_start).toLocaleString('en-US', {
						timeStyle: 'short',
						dateStyle: 'full'
					})} ET
				{/if}
			</div>

			<span class="mb-4">
				<div class="underline font-extrabold">Featured speakers:</div>
				{@html event.content_speakers}
			</span>
			{#if event.status !== 'pending'}
				{@html event.content_replay}
			{:else}
				<div class="prose2 border-b border-b-black mb-4 pb-8">
					{@html event.content}
				</div>
				<div class="text-sm">
					{@html event.content_cpe}
				</div>
			{/if}
		</div>
		<div class="hidden md:inline w-1/3 bg-[#dedede] p-6">
			<User {cookie} />
		</div>
	</div>
{:else}
	<div class="text-error-500 text-xl">Error Loading Event</div>
{/if}
