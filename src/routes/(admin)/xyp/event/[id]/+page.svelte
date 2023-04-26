<script lang="ts">
    import type { PageData } from './$types';    

    import EventForm from "$lib/components/Admin/EventForm.svelte";

    export let data: PageData;

    let { event } = data;    
</script>

<div class="container p-10">
    <EventForm {event} />
</div>