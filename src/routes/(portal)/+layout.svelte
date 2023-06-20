<script lang="ts">
	// skeleton.dev and branded theme styles - changing the order of these may break things
	import '../../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../../app.postcss'; // do explict global overrides here, if needed

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import { AppShell, Modal } from '@skeletonlabs/skeleton';
	import { Toast } from '@skeletonlabs/skeleton';

	import User from '$lib/components/User/User.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ cookie } = data);

	//***** scroll bs
	import { scrollStore } from '$lib/data/scrollStore';
	let scrollTarget: any;
	function scrollHandler(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		$scrollStore = event.currentTarget.scrollTop;
		scrollTarget = event.currentTarget;
	}

	afterNavigate(() => {
		// document.getElementById('page')?.scrollTo(0, 0);
		scrollTarget?.scrollTo(0, 0);
	});
</script>

<Modal buttonTextSubmit="Continue" buttonPositive="variant-filled-primary" />

<!-- <AppShell slotSidebarRight="md:w-1/4" slotPageHeader="px-36"> -->
<AppShell on:scroll={scrollHandler}>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<!-- <svelte:fragment slot="sidebarRight">
		<div class="h-full w-full p-10 hidden md:block bg-white">
			<User {cookie} />
		</div>
	</svelte:fragment> -->

	<!-- using this section to display login/user info on small screens -->
	<svelte:fragment slot="pageHeader">
		{#if $page.url.pathname == '/'}
			<div class="xl:hidden px-6 bg-[#dedede] flex items-center">
				<User {cookie} />
			</div>
		{/if}
	</svelte:fragment>

	<!-- main content -->
	<div class="relative container mx-auto bg-white"><slot /></div>

	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
	<Toast />
</AppShell>
