<script lang="ts">
	import type { PageData } from './$types';
	import SearchEventCard from '$lib/components/SearchEventCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	export let data: PageData;

	$: ({ query, upcoming, replay, past, faq } = data);
</script>

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
				<a href="/faq#faq-{f.id}" class="block">{f.title}</a>
				<div class="text-sm">{@html f.content}</div>
			{/each}
		</div>
	{/if}
</div>
