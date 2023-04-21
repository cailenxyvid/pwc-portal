<script lang="ts">
    import type { PageData } from './$types';    

    import EventList from '$lib/components/Admin/EventList.svelte';
	
    export let data: PageData;

    let { events } = data 
</script>

<div class="container p-12 items-center">
    <EventList {events} />
</div>