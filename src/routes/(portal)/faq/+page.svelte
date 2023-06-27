<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import OpenGraphDomain from '$lib/components/OpenGraphDomain.svelte';

	export let data: PageData;

	let { faqs } = data;
	let target = '';

	onMount(() => {
		if (window?.location.hash) {
			target = window.location.hash;			
		}
	});
	$: ({ faqs } = data);
</script>

<OpenGraphDomain />

<div class="h-full p-8">
	<h2 class="text-primary-500 mb-8">Frequently Asked Questions</h2>
	<Accordion autocollapse>
		{#each faqs as faq, i}
			<div class="{i < faqs.length - 1 ? 'border-b border-b-[#dedede]' : ''} mb-2">
				<AccordionItem open={target === '#faq-' + faq.id}>
					<svelte:fragment slot="summary">
						<div class="text-xl font-bold mb-2" id="faq-{faq.id}">{faq.title}</div>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="mb-6">{@html faq.content}</div>
					</svelte:fragment>
				</AccordionItem>
			</div>
		{/each}
	</Accordion>
</div>