<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	import type { PageData } from './$types';

  	export let data: PageData;
	
	let { faqs } = data;
    $: ({ faqs } = data);
</script>
    
<div class="container h-full mx-auto justify-center pt-10 pl-10 pr-10 space-y-12">
    <h1 class="text-primary-500">Frequently Asked Questions</h1>
	{#each faqs as faq}
    <div class="p-8 border-b border-b-black">
        <div id="faq-{faq.id}" class="text-xl">{faq.title}</div>
        <div class="text-sm mt-4">{@html faq.content}</div>
    </div>
	{/each}
</div>

<Footer />