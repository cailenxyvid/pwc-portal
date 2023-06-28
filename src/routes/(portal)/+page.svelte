<script lang="ts">
	import type { ModalComponent } from '@skeletonlabs/skeleton';
	import type { Profile } from '$lib/data/myTypes';
	import type { PageData } from './$types';

	import { onMount } from 'svelte';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { isProfileComplete } from '$lib/util/validationHelpers';
	import { myProfile } from '$lib/data/myProfile';

	import User from '$lib/components/User/User.svelte';
	import UpcomingEvent from '$lib/components/UpcomingEvent.svelte';
	import HoverEventCard from '$lib/components/HoverEventCard.svelte';
	import ModalEditProfile from '$lib/components/User/ModalEditProfile.svelte';
	import OpenGraphDomain from '$lib/components/OpenGraphDomain.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import NoUpcomingEvent from '$lib/components/NoUpcomingEvent.svelte';

	export let data: PageData;

	onMount(() => {
		if (cookie && $myProfile && !isProfileComplete()) {
			const c: ModalComponent = { ref: ModalEditProfile };
			modalStore.trigger({
				type: 'component',
				component: c
			});
		}
	});

	$myProfile = data.myProfile as Profile;
	let { pendingEvents, pastEvents, cookie } = data;
	$: ({ pendingEvents, pastEvents } = data);
</script>

<OpenGraphDomain />

<Hero />

<div id="mainContent" class="justify-center mb-16 pb-8">
	<div class="w-full flex flex-row space-x-6">
		<div class="grow p-8 md:p-16">
			<h4 class="">
				Trust in Action is a series of candid conversations featuring leading insights on trust.<br
				/>
				Together, we explore how to take action on the most critical issues in business and society —
				as they emerge in real time. <br /> Join us to hear from distinguished thought leaders across
				business, government and academia.
			</h4>
			{#if pendingEvents.length === 0}
				<NoUpcomingEvent {cookie} event={pastEvents[0]} />
			{:else}
				{#each pendingEvents as event}
					<UpcomingEvent {event} {cookie} />
				{/each}
			{/if}
		</div>
		<div class="hidden xl:inline w-96 bg-[#dedede]">
			<User {cookie} />
		</div>
	</div>

	<div class="p-8 md:p-16">
		<h2 class="my-12">Past events</h2>
		<div
			class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-10 lg:gap-x-20 2xl:gap-x-30 gap-y-5 lg:gap-y-10 2xl:gap-y-20"
		>
			{#each pastEvents as event}
				<HoverEventCard {event} {cookie} />
			{/each}
		</div>
	</div>
</div>
