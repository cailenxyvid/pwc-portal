<script>
    import { page } from '$app/stores';
    import { AppBar } from '@skeletonlabs/skeleton';
    import logo from '$lib/assets/PwC-logo.svg';
    console.log($page)
</script>

<AppBar>
	<svelte:fragment slot="lead">
        <div class="p-1">
            <!-- PwC brand guide requires 65px min width -->
            <img src={logo} alt="PwC Logo" title="PwC" class="min-w-[65px]" />
        </div>
    </svelte:fragment>
	<div class="ml-4 md:ml-12 md:text-xl md:space-x-10">        
        <a href="/" class="topnav {$page.route.id === '/' ? 'active' : ''}">Upcoming&nbsp;Events</a>
        <a href="/replay" class="topnav {$page.route.id === '/replay' ? 'active' : ''}">Replay&nbsp;Events</a>
    </div>
	<svelte:fragment slot="trail">
        <!-- (actions) -->
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