<script lang="ts">
	import type { Event } from '$lib/data/myTypes';

	import { myProfile } from '$lib/data/myProfile';

	import { buttonCheck } from '$lib/util/validationHelpers';
	import { displayWarning } from '$lib/util/displayToast';
	import { trackAction } from '$lib/util/trackAction';

	export let event: Event;
	export let cookie: string | undefined;
	export let xyp_portal_url: string;
	export let registerEvent: any;

	const actionGuide = () => {
		if (buttonCheck(cookie)) {
			trackAction(cookie ?? '', 'download_action_guide', event.id);
			window.open(event.action_guide, '_blank');
		}
	};

	const watchNow = async () => {
		if (buttonCheck(cookie)) {
			await registerEvent(event);
			trackAction(cookie ?? '', 'watch_replay', event.id);
			window.open(
				xyp_portal_url + event.xyp_id + '?emailAddress=' + $myProfile.email + '&directEntry=true',
				'_blank'
			);
		}
	};
	let showHover = false;
</script>

<!-- <div class="block rounded-lg border shadow-sm bg-gray-50 relative"> -->
<div class="flex flex-col h-full hover:bg-[#dedede] p-2">
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
		{#if event.status === 'replay'}
			<button
				on:click={watchNow}
				class="btn text-white {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'}"
				>Watch now</button
			>
		{/if}
		<button
			on:click={actionGuide}
			class="btn text-white {event.featured ? 'bg-primary-500' : 'bg-[#2d2d2d]'} {event.featured
				? 'hover:bg-[#2d2d2d]'
				: 'hover:bg-primary-500'}"
			disabled={!event.action_guide}>Action guide</button
		>
	</div>
	<div>
		<!-- TODO: Why do I need important here? -->
		<!-- TODO: Why doesn't color work?  -->
		<a href="/event/{event.id}" class="no-underline" style="text-decoration: none !important;"
			><div class="text-xl font-bold text-primary-500">{event.title}</div></a
		>
	</div>
	<div class="relative">
		<div class="event-date">
			{#if event.status != 'upcoming'}<div>Original air date:</div> {/if}
			{new Date(event.event_start).toLocaleString('en-US', {
				timeStyle: 'short',
				dateStyle: 'full'
			})} ET
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

	<!-- <div class="text-right w-full self-end"> -->
	<div class="text-right w-full mt-auto mb-2">
		<button
			class="hidden md:inline-block"
			on:mouseenter={() => {
				showHover = true;
			}}
			on:mouseleave={() => {
				showHover = false;
			}}
		>
			<i class="fa-light fa-2xl fa-circle-plus text-primary-500 p-2" />
		</button>
		<button
			class="inline-block md:hidden"
			on:click={() => {
				showHover = !showHover;
			}}
		>
			<i class="fa-light fa-2xl fa-circle-plus text-primary-500 p-2" />
		</button>
	</div>
</div>

<!-- TODO: Why doesn't this work -->
<style>
	a {
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
