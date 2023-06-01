<script lang='ts'>
	// skeleton.dev and branded theme styles - changing the order of these may break things
	import '../../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../../app.postcss'; // do explict global overrides here, if needed

	import { AppShell } from '@skeletonlabs/skeleton';	
	import { Toast } from '@skeletonlabs/skeleton';
	
	import User from "$lib/components/User/User.svelte";
	import Header from '$lib/components/Header.svelte';
	
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ cookie } = data);

	//***** scroll bs	
	import { scrollStore } from '$lib/data/scrollStore';
	function scrollHandler(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement; }) {
		$scrollStore = event.currentTarget.scrollTop;
		// console.log(event.currentTarget)
	}
</script>


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
		<div class="block md:hidden bg-white">
			<User {cookie} />
		</div>
	</svelte:fragment>
	
	<!-- main content -->
	<div class="relative"><slot /></div>

	<Toast />
</AppShell>
