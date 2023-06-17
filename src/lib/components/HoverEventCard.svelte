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
<div class="flex flex-col h-full relative">
	{#if showHover}
		<div class="absolute bottom-4 rounded-sm shadow-lg bg-[#dedede] p-4 pb-6">
			{event.content_meta}
		</div>
	{/if}
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
	<div class="mb-4">
		<div>
			<!-- TODO: Why do I need important here? -->
			<!-- TODO: Why doesn't color work?  -->
			<a href="/event/{event.id}" class="no-underline" style="text-decoration: none !important;"
				><h3 class="font-bold text-primary-500">{event.title}</h3></a
			>
		</div>
		<div class="text-small">
			<!-- TODO: get text-small working with <p> in the data-->
			{@html event.content_speakers}
		</div>
	</div>
	<!-- <div class="text-right w-full self-end"> -->
	<div class="text-right w-full mt-auto">
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
