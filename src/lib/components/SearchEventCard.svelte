<script lang="ts">
	import type { Event } from '$lib/data/myTypes';
	import { page } from '$app/stores';
	export let event: Event;

	let query: string | null;

	const highlight = (text: string) => {
		if (!query) return;
		let queryString = ' ' + query;
		let regEx = new RegExp(queryString, 'ig');
		return text.replace(regEx, `<b class="highlight">${queryString}</b>`);
	};

	$: query = $page.url.searchParams.get('queryString');
</script>

{#key query}
	<div class=" p-2">
		<a class="block" href="/event/{event.id}">{@html highlight(event.title)}</a>
		<div class="event_speakers">
			<div class="bold underline">Featured speakers:</div>
			<div class="">
				{@html highlight(event.content_speakers)}
			</div>
		</div>
		<div class="">
			{#if event.status === 'pending'}
				{@html highlight(event.content)}
			{:else}
				{@html highlight(event.content_replay)}
			{/if}
		</div>
	</div>
{/key}
