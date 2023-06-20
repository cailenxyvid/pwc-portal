<script>
	import { afterNavigate } from '$app/navigation';
	import { clickOutside } from '$lib/util/clickOutside';

	let open = false;
	let clickOutFired = false;

	let clickOut = () => {
		open = false;
		clickOutFired = true;
		setTimeout(() => {
			clickOutFired = false;
		}, 500); //# wtf man. this is ugly af but works (for now).
	};

	let toggle = () => {
		if (clickOutFired) {
			clickOutFired = false;
			return;
		} else if (!open) {
			document.querySelector('#page')?.scrollTo(0,0);
			open = true;
		}				
	};

	afterNavigate(() => {
		open = false;
	});
</script>

<div class="hamburger-container relative md:hidden">
	<button on:click={toggle}><i class="fa fa-bars" /></button>
	{#if open}
		<div
			use:clickOutside
			on:outclick={clickOut}
			class="absolute bg-white w-48 right-0 p-6 rounded-sm space-y-2 text-black isolate z-50"
		>
			<a class="block" href="/">Webcasts</a>
			<a class="block" href="/faq">FAQ</a>
			<a class="block" href="/search">Search</a>
			<!-- <a class="block" href="/speakers">Our Speakers</a> -->
			<!-- <a class="block" href="/about">About Us</a>                 -->
			<!-- <a class="block" href="/help">Help</a> -->
		</div>
	{/if}
</div>

<style>
	button:hover,
	.active {
		color: #d04a02;
	}
</style>
