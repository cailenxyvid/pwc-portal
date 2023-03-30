<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import User from "$lib/components/User.svelte";
	import Header from '$lib/components/Header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription },
			} = supabase.auth.onAuthStateChange(() => {
				invalidate('supabase:auth');
			});

		return () => subscription.unsubscribe();
	});
</script>


<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<svelte:fragment slot="sidebarRight">
		<div class="bg-secondary-500 h-full p-10 hidden md:block">
			<User session={data.session} />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		<div class="block md:hidden">
			<User session={data.session} />
		</div>
	</svelte:fragment>
	
	<slot />
	
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>

