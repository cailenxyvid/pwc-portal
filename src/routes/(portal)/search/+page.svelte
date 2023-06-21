<script lang="ts">
	import type { PageData } from './$types';
	import { highlight } from '$lib/util/searchHighlight';
	import SearchEventCard from '$lib/components/SearchEventCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import OpenGraphDomain from '$lib/components/OpenGraphDomain.svelte';

	export let data: PageData;
	
	$: ({ query, upcoming, replay, past, faq } = data);
</script>

<OpenGraphDomain />

<div class="p-4 md:p-12 space-y-16">
	<div class="md:hidden">
		<SearchBar show={true} />
	</div>
	{#if query}
		<div>
			<h3>Upcoming events</h3>
			<h4>{upcoming.length} results found.</h4>
			<div class="grid grid-cols-1 gap-4">
				{#each upcoming as event}
					<SearchEventCard {event} />
				{/each}
			</div>
		</div>
		<div>
			<h3>Past events (replay eligible)</h3>
			<h4>{replay.length} results found.</h4>
			<div class="grid gap-4">
				{#each replay as event}
					<SearchEventCard {event} />
				{/each}
			</div>
		</div>
		<div>
			<h3>Past events</h3>
			<h4>{past.length} results found.</h4>
			<div class="grid gap-4">
				{#each past as event}
					<SearchEventCard {event} />
				{/each}
			</div>
		</div>
		<div>
			<h3>FAQs</h3>
			<h4>{faq.length} results found.</h4>
			{#each faq as f}
				<div class="p-2">
					<a href="/faq/#faq-{f.id}" class="block text-xl">{@html highlight(f.title, query)}</a>
					<div class="text-sm">{@html highlight(f.content, query)}</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
