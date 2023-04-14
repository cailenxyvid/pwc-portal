<script lang='ts'>
	// skeleton.dev and branded theme styles - changing the order of these may break things
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss'; // do explict global overrides here, if needed

	import { AppShell } from '@skeletonlabs/skeleton';	
	import { Toast } from '@skeletonlabs/skeleton';
	
	import User from "$lib/components/User/User.svelte";
	import Header from '$lib/components/Header.svelte';
	
	import type { LayoutData } from './$types';

	import { invalidate } from '$app/navigation';	
	import { onMount } from 'svelte';	

	export let data: LayoutData;

	$: ({ supabase, cookie, session } = data);

	// authentication
	onMount(() => {		
		if (!cookie && session?.user.id) {
			cookie = session.user.id;
			console.log('layout.svelte - cookie was missing but session was available, setting cookie', cookie)
		}
		const {
			data: { subscription },
			} = supabase.auth.onAuthStateChange(() => {
				invalidate('supabase:auth');
			});

		return () => subscription.unsubscribe();
	});
</script>

<AppShell slotSidebarRight="md:w-1/4">
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	
	<svelte:fragment slot="sidebarRight">
		<div class="h-full w-full p-10 hidden md:block bg-white">
			<User {session} {cookie} />
		</div>
	</svelte:fragment>
	
	<!-- using this section to display login/user info on small screens -->
	<svelte:fragment slot="pageHeader">
		<div class="block md:hidden bg-white">
			<User {session} {cookie} />
		</div>
	</svelte:fragment>
	
	<!-- main content -->
	<slot />

	<Toast />
</AppShell>