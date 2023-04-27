<script lang="ts">
    import type { PageData, ActionData } from './$types';    
    import { toastStore } from '@skeletonlabs/skeleton';
    import EventList from '$lib/components/Admin/EventList.svelte';

    export let form: ActionData;
    export let data: PageData;

    let { events } = data;

    if (form?.success) {
        toastStore.trigger({
            message: 'Event status updated!',
            background: 'variant-filled-success',                        
        });
    }    
</script>

<div class="container p-12 items-center">
    <EventList {events} />
</div>