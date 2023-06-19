<script lang="ts">
	import { fade } from 'svelte/transition';

	import { myEvents, myReplayEvents } from '$lib/data/myEvents';
	import { myProfile } from '$lib/data/myProfile';
</script>

<div class="rounded-sm p-4" transition:fade>
	<hr class="border-t border-black" />

	{#if $myEvents.length > 0}
		<div class="text-md border-t border-black">Upcoming</div>
		{#each $myEvents as row}
			<div class="text-primary-500 underline">
				<a
					target="_blank"
					href="https://portal12.xyvid.com/{row.event
						.xyp_id}?emailAddress={$myProfile.email}&directEntry=true"
				>
					<i class="fa fa-play" />
					{row.event.title}
				</a>
			</div>
		{/each}
	{:else}
		You are not currently registered for any upcoming events.
	{/if}

	<div class="text-md border-t border-black mt-8">Replay</div>
	<i class="text-sm block mb-6"
		>Need your CPE certificate from a live webcast? Access the replay, click the "CPE" icon at the
		bottom-right, and download it instantly.</i
	>
	{#if $myReplayEvents.length > 0}
		{#each $myReplayEvents as row}
			{#if row.event.status === 'replay'}
				<div class="text-primary-500 underline">
					<a
						target="_blank"
						href="https://portal12.xyvid.com/{row.event
							.xyp_id}?emailAddress={$myProfile.email}&directEntry=true"
					>
						<i class="fa fa-play" />
						{row.event.title}
					</a>
				</div>
			{:else}
				<div>
					{row.event.title}
				</div>
			{/if}
		{/each}
	{:else}
		You are not registered for any replay events.
	{/if}
</div>
