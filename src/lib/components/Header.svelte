<script>
	import { page } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton';
	import Menu from './Menu.svelte';
	import SearchBar from './SearchBar.svelte';
</script>

<AppBar background="bg-[#464646]" slotDefault="text-right">
	<svelte:fragment slot="lead">
		<div class="p-1 w-48">			
			<a href="/">
				<img src="/pwc-logo-wht.png" class="h-12 inline" alt="" />
				<img src="/TLI wordmark white.png" class="h-12 inline ml-4" alt="" />
			</a>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="default">		
		<div class="md:text-xl md:space-x-10 md:-mb-40 sm:-mb-20 hidden md:inline text-white">
			<a href="/" class="topnav {$page.route.id === '/' ? 'active' : ''} ">Webcasts</a>			
			<a href="/faq" class="topnav {$page.route.id === '/faq' ? 'active' : ''}">FAQs</a>
		</div>
		<div class="ml-4 md:ml-12 md:-mb-40 sm:-mb-20 text-white hidden md:inline-block">
			<SearchBar />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="inline md:hidden text-white">
			<Menu />
		</div>
	</svelte:fragment>
</AppBar>

<style>
	.topnav {		
		color: #fff;
	}
	
	.topnav:hover,
	.active {
		color: #d04a02;
		text-decoration: none;
	}
</style>
