<script lang="ts">
	import type { Event } from '$lib/data/myTypes';
	import { page } from '$app/stores';
	import { highlight } from '$lib/util/searchHighlight';
	export let event: Event;

	let query: string | null;

	$: query = $page.url.searchParams.get('queryString');
</script>

{#key query}
	<div class="p-2">
		<a class="unstyled block text-xl" href="/event/{event.id}"
			>{@html highlight(event.title, query)}</a
		>
		<div class="event-date mb-4 text-sm">
			{new Date(event.event_start).toLocaleString('en-US', {
				timeStyle: 'short',
				dateStyle: 'full'
			})} ET
		</div>
		<div class="event_speakers">
			<div class="bold underline">Featured speakers:</div>
			<div class="searchEventCardSpeakers">
				{@html highlight(event.content_speakers, query)}
			</div>
		</div>
		<div class="">
			{#if event.status === 'pending'}
				{@html highlight(event.content, query)}
			{:else}
				{@html highlight(event.content_replay, query)}
			{/if}
		</div>
	</div>
{/key}
