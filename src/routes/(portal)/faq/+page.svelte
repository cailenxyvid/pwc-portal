<script lang="ts">
	import ReplayEvent from '$lib/components/ReplayEvent.svelte';

	import type { PageData } from './$types';

  	export let data: PageData;
	
	let { faqs } = data;
    $: ({ faqs } = data);
</script>
    
<h2>FAQs</h2>  
<div class="container h-full mx-auto justify-center pt-10 pl-10 pr-10 space-y-12">
	{#each faqs as faq}
	<h3 id="faq-{faq.id}">{faq.title}</h3>
    <div class="text-sm">{faq.content}</div>
	{/each}
</div>
