<script>
    import { page } from '$app/stores';
    import { AppBar } from '@skeletonlabs/skeleton';
    import logo from '$lib/assets/PwC-logo.svg';
    import tliLogo from '$lib/assets/tli-wordmark-4k.png';
    import Menu from './Menu.svelte';
    import SearchBar from './SearchBar.svelte';
</script>

<AppBar background="bg-transparent">
	<svelte:fragment slot="lead">
        <div class="p-1">
            <!-- PwC brand guide requires 65px min width -->
            <img src={logo} alt="PwC Logo" title="PwC" class="min-w-[65px]" />            
        </div>        
    </svelte:fragment>
    <!-- <img src={tliLogo} alt="Trust Leadership Institute Logo" title="Trust Leadership Institute" class="min-w-[65px] max-w-[200px]" /> -->
	<div class="ml-4 md:ml-12 md:text-xl md:space-x-10 md:-mb-40 sm:-mb-20 hidden sm:inline">                
        <a href="/" class="topnav {$page.route.id === '/' ? 'active' : ''}">Events</a>
        <!-- <a href="/replay" class="topnav {$page.route.id === '/replay' ? 'active' : ''}">Past&nbsp;Events</a> -->
        <a href="/faq" class="topnav {$page.route.id === '/faq' ? 'active' : ''}">FAQ</a>
    </div>  
    <div class="inline-block ml-4 md:ml-12 md:-mb-40 sm:-mb-20">
        <SearchBar />
    </div>
	<svelte:fragment slot="trail">
        <Menu />
    </svelte:fragment>
</AppBar>

<style>
    .topnav {
        /* font-size: x-large; */
        /* margin-right: 3em; */
        color: #333;
    }

    .topnav:hover,.active {
        border-bottom: 5px solid #333;
    }
</style>