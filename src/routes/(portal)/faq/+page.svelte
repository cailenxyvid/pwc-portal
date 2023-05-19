<script lang="ts">
	import ReplayEvent from '$lib/components/ReplayEvent.svelte';

	import type { PageData } from './$types';

  	export let data: PageData;
	
	let { faqs } = data;
    $: ({ faqs } = data);
</script>
    
<div class="container h-full mx-auto justify-center pt-10 pl-10 pr-10 space-y-12">
    <h2>FAQs</h2>
	{#each faqs as faq}
	<h3 id="faq-{faq.id}">{faq.title}</h3>
    <div class="text-sm">{@html faq.content}</div>
	{/each}
</div>

<div class="footer bg-gray-800 text-white w-full p-2">
    <div class="flex flex-row gap-24">
        <div>
            Have additional questions?
            <span class="text-xl block">
                <a href="http://us_trust_leadership_institute_inbox@pwc.com">Contact us</a> to 
                learn more.
            </span>
        </div>
        <div>
            <b class="text-xl block">Jonathan Block</b>
            Managing Director, PwC
        </div>
        <div>
            <b class="text-xl block">Megan Conway</b>
            Managing Director, PwC
        </div>
    </div>
    <div class="text-xs w-full mt-6">© 2023 PwC. All rights reserved. PwC refers to the US member firm, and may sometimes refer to the PwC network. Each member firm is a separate legal entity. Please see www.pwc.com/structure for further details. This content is for general purposes only, and should not be used as a substitute for consultation with professional advisors.
    </div>
</div>
