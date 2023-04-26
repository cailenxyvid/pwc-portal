<script>
    import { page } from '$app/stores';
    import { AppBar } from '@skeletonlabs/skeleton';

</script>

<AppBar background="bg-primary-500">
	<svelte:fragment slot="lead">
        <div class="p-1">
            <h1>TiL Content Admin</h1>
        </div>
    </svelte:fragment>
    <!-- <img src={tliLogo} alt="Trust Leadership Institute Logo" title="Trust Leadership Institute" class="min-w-[65px] max-w-[200px]" /> -->
	<!-- <div class="ml-4 md:ml-12 md:text-xl md:space-x-10 md:-mb-40 sm:-mb-20 hidden sm:inline">                
        <a href="/xyp/events" class="topnav {$page.route.id === '/(admin)/xyp/events' ? 'active' : ''}">Upcoming&nbsp;Events</a>
        <a href="/xyp/replay" class="topnav {$page.route.id === '/(admin)/xyp/replay' ? 'active' : ''}">Replay&nbsp;Events</a>
    </div> -->
	<svelte:fragment slot="trail">
        ?
    </svelte:fragment>
</AppBar>

<style>  
    .topnav:hover,.active {
        border-bottom: 5px solid #fff;
    }
</style>