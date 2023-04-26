<script lang="ts">
    import type { PageData } from './$types';    

    import EventForm from "$lib/components/Admin/EventForm.svelte";

    export let data: PageData;

    let { event } = data;    
</script>

<div class="container p-10">
    <h2 class="mb-2">Edit Event</h2>
    <EventForm {event} />
</div>