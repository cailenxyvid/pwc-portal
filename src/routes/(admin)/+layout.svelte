<script lang='ts'>
	// skeleton.dev and branded theme styles - changing the order of these may break things
	import '../../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';	

	import { AppShell } from '@skeletonlabs/skeleton';	
	import { Toast } from '@skeletonlabs/skeleton';
	
	import type { LayoutData } from './$types';

	import { invalidate } from '$app/navigation';	
	import { onMount } from 'svelte';	

    import Header from '$lib/components/Admin/Header.svelte';
    import Login from '$lib/components/User/Login.svelte';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	// authentication
	onMount(() => {				
		const {
			data: { subscription },
			} = supabase.auth.onAuthStateChange(() => {
				invalidate('supabase:auth');
			});

		return () => subscription.unsubscribe();
	});
</script>

{#if session?.user.id}

	{#if session.user.email?.includes('@xyvid.com')}
	<AppShell slotHeader="bg-primary-500 text-white">
		<svelte:fragment slot="header">
			<Header />
		</svelte:fragment>
		
		<!-- main content -->
		<slot />

		<Toast />
	</AppShell>
	{:else}
	<div class="flex flex-col justify-center items-center h-screen space-y-1">
		<div class="p-3 rounded-md space-y-6 variant-filled-error" aria-live="polite">
			<h1>Access Denied!</h1>
			<h2>{session.user.email}</h2>
			<h3>This incident will be reported!</h3>
		</div>
	</div>
	{/if}
{:else}
<div class="flex flex-col justify-center items-center h-screen space-y-1">
    <div class="text-xl bg-tertiary-500 p-3 rounded-md space-y-6" aria-live="polite">
        <Login {session} />
    </div>
</div>
{/if}