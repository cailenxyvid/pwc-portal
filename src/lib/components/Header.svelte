<script>
    import { page } from '$app/stores';
    import { AppBar } from '@skeletonlabs/skeleton';
    import logo from '$lib/assets/PwC-logo.svg';
    import tliLogo from '$lib/assets/tli-wordmark-4k.png';
    import Menu from './Menu.svelte';
    import SearchBar from './SearchBar.svelte';
</script>

<AppBar background="bg-[#464646]">
	<svelte:fragment slot="lead">
        <div class="p-1 w-48 py-8">
            <!-- PwC brand guide requires 65px min width -->
            <!-- <img src={logo} alt="PwC Logo" title="PwC" class="min-w-[65px]" />             -->
            <img src="/pwc-logo-wht.png" class="h-12 inline" alt="">
            <img src="/TLI wordmark white.png" class="h-12 inline ml-4" alt="">
        </div>        
    </svelte:fragment>
    <!-- <img src={tliLogo} alt="Trust Leadership Institute Logo" title="Trust Leadership Institute" class="min-w-[65px] max-w-[200px]" /> -->
	<div class="ml-4 md:ml-12 md:text-xl md:space-x-10 md:-mb-40 sm:-mb-20 hidden sm:inline text-white py-64">                
        <a href="/" class="topnav {$page.route.id === '/' ? 'active' : ''}">Webcasts</a>
        <!-- <a href="/replay" class="topnav {$page.route.id === '/replay' ? 'active' : ''}">Past&nbsp;Events</a>  -->
        <a href="/faq" class="topnav {$page.route.id === '/faq' ? 'active' : ''}">FAQs</a>
    </div>  
    <div class="inline-block ml-4 md:ml-12 md:-mb-40 sm:-mb-20 text-white">
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
        color: #fff;
    }

    .topnav:hover,.active {
        border-bottom: 5px solid #fff;
    }
</style>