<script lang="ts">
    import type { ActionData } from './$types';

    import { toastStore } from '@skeletonlabs/skeleton';

    import EventForm from "$lib/components/Admin/EventForm.svelte";  
	import { goto } from '$app/navigation';

    export let form: ActionData;

    if (form?.success) {
        toastStore.trigger({
            message: 'Event created!',
            background: 'variant-filled-success',
            timeout: 10000,
            action: {
                label: 'Edit event',
                response: () => goto('/xyp/event/'+form?.new_event)
            }
        });
    }    
</script>

<div class="container p-10">
    <h2 class="mb-2">Create Event</h2>
    <EventForm />
</div>