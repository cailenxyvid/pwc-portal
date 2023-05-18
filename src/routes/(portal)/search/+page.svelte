<script lang="ts">
    import type { PageData } from './$types';    
    import SearchEventCard from '$lib/components/SearchEventCard.svelte';

    export let data: PageData;    
    
    $: ({ upcoming, replay, past, faq } = data);
</script>

<div class="container mx-auto p-4 md:p-12 space-y-16">
    <div>
        <h3>Upcoming events</h3>
        <h4>{upcoming.length} results found.</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {#each upcoming as event}
            <SearchEventCard {event} />
            {/each}
        </div>
    </div>
    <div>
        <h3>Past events (replay eligible)</h3>
        <h4>{replay.length} results found.</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {#each replay as event}
            <SearchEventCard {event} />
            {/each}
        </div>    
    </div>
    <div>
        <h3>Past events</h3>
        <h4>{past.length} results found.</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {#each past as event}
            <SearchEventCard {event} />
            {/each}
        </div>
    </div>
    <div>
        <h3>FAQs</h3>
        <h4>{faq.length} results found.</h4>
        {#each faq as f}
        {f}
        {/each}
    </div>
</div>