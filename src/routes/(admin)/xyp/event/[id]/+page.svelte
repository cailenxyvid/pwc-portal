<script lang="ts">
    import type { PageData, ActionData } from './$types';

    import { toastStore } from '@skeletonlabs/skeleton';

    import EventForm from "$lib/components/Admin/EventForm.svelte";

    export let data: PageData;
    export let form: ActionData;

    let { event } = data;    

    if (form?.success) {
        toastStore.trigger({
            message: 'Event updated!',
            background: 'variant-filled-success',
            timeout: 10000
        });
    }    
</script>

<div class="container p-10">
    <h2 class="mb-2">Edit Event</h2>
    <EventForm {event} />
</div>