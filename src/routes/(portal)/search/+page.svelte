<script lang="ts">
    import type { PageData } from './$types';    
    import SearchEventCard from '$lib/components/SearchEventCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

    export let data: PageData;    
    
    $: ({ upcoming, replay, past, faq } = data);
</script>

<div class="container mx-auto p-4 md:p-12 space-y-16">
    <div class="t">
        <SearchBar show={true} />
    </div>
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
        <a href="/faq#faq-{f.id}" class="block">{f.title}</a>
        <div class="text-sm">{f.content}</div>
        {/each}
    </div>
</div>