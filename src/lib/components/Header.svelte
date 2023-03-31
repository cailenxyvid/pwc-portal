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
	<div class="items-center text-center">
        <a href="/" class="topnav">Upcoming Events</a>
        <a href="/replay" class="topnav">Replay Events</a>
    </div>
	<svelte:fragment slot="trail">
        <!-- (actions) -->
    </svelte:fragment>
</AppBar>

<style>
    .topnav {
        font-size: x-large;
        margin-right: 3em;
    }

    .topnav:hover {
        border-bottom: 5px solid #333;
    }
</style>