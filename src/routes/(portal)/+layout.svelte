<script lang="ts">
	// skeleton.dev and branded theme styles - changing the order of these may break things
	import '../../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';

	// do global overrides here, if needed
	import '../../app.postcss';

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

	function scrollHandler(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		$scrollStore = event.currentTarget.scrollTop;
	}

	//# issue with SkeletonUI AppShell breaks default svelte/browser scrolling behavior and requires this work around, per Skeleton team
	afterNavigate(() => {
		if (!window.location.hash) {
			document.getElementById('page')?.scrollTo(0, 0);
		}
	});
</script>

<Modal buttonTextSubmit="Continue" buttonPositive="variant-filled-primary" />

<AppShell on:scroll={scrollHandler}>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<!-- using this section to display login/user info on small screens -->
	<svelte:fragment slot="pageHeader">
		{#if $page.url.pathname == '/'}
			<div class="xl:hidden bg-[#dedede] flex items-center">
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
