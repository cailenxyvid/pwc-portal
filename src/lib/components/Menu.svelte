<script>
	import { afterNavigate } from '$app/navigation';
	import { clickOutside } from '$lib/util/clickOutside';

	let open = false;
	let toggle = () => {
		open = !open;
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
			on:outclick={() => (open = false)}
			class="absolute bg-white w-48 right-0 p-6 rounded-sm space-y-2 text-black z-50"
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
