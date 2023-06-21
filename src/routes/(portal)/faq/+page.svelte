<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	import OpenGraphDomain from '$lib/components/OpenGraphDomain.svelte';

	let { faqs } = data;
	$: ({ faqs } = data);
</script>

<OpenGraphDomain />

<div class="h-full p-8">
	<h2 class="text-primary-500 mb-8">Frequently Asked Questions</h2>
	{#each faqs as faq, i}
		<div class="{i < faqs.length - 1 ? 'border-b border-b-[#dedede]' : ''} mb-2">
			<div class="text-xl font-bold mb-2" id="faq-{faq.id}">{faq.title}</div>
			<div class="mb-6">{@html faq.content}</div>
		</div>
	{/each}
</div>
