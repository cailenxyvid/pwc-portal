<script lang="ts">
	import { browser } from '$app/environment';
	import { clipboard } from '@skeletonlabs/skeleton';
	import { displaySuccess } from '$lib/util/displayToast';
	import type { Event } from '$lib/data/myTypes';

	export let event: Event;

	let url = '';

	$: if (browser) {
		url = window.location.origin + '/event/' + event.id;
	}

	const copyLink = () => {
		let input = document.getElementById('socialLink');
		input.select();
		input.setSelectionRange(0, 99999); // for mobile

		navigator.clipboard.writeText(input.value);
		displaySuccess('Link copied to clipboard');
	};
</script>

<svelte:head>
	<!-- Open Graph -->
	<meta property="og:description" content={event.content_meta} />
	<meta property="og:image" content={event.image_url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={event.title} />
	<meta property="og:title" content={event.title} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:url" content="//tli.xyvid.com/{event.id}" />
	<!-- # dynamic url capturing doesn't work here, need SSR solution -->
</svelte:head>

<div class="flex gap-8">
	<a href="https://www.facebook.com/sharer.php?u={url}" target="_blank"
		><i class="fa-brands fa-facebook text-[#2d2d2d] hover:text-[#d04a02] transition-colors" /></a
	>
	<a href="https://twitter.com/intent/tweet?url={url}" target="_blank"
		><i class="fa-brands fa-twitter text-[#2d2d2d] hover:text-[#d04a02] transition-colors" /></a
	>
	<a href="https://www.linkedin.com/shareArticle?mini=true&url={url}" target="_blank"
		><i class="fa-brands fa-linkedin text-[#2d2d2d] hover:text-[#d04a02] transition-colors" /></a
	>
	<!-- svelte-ignore a11y-invalid-attribute :( -->
	<a href="#" on:click={copyLink}
		><i class="fa-solid fa-link text-[#2d2d2d] hover:text-[#d04a02] transition-colors" /></a
	>
	<!-- <button use:clipboard={url}><i class="fa-solid fa-share"></i></button>     -->
</div>
<input class="hidden" type="text" id="socialLink" value={url} />
<!-- {#if showLink}
<div use:clickOutside on:outclick={() => (showLink = false)}>
    <input type="text" class="variant-ghost-primary" value="{url}">
</div>
{/if} -->
