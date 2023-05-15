<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;    

    $: ({ upcoming, replay, past, faq } = data);
</script>

<h3>Upcoming Events</h3>
<h4>{upcoming.length} results found.</h4>
{#each upcoming as event}
<a class="block" href="/event/{event.id}">{event.title}</a>
{/each}

<h3>Replay Events</h3>
<h4>{replay.length} results found.</h4>
{#each replay as event}
<a class="block" href="/event/{event.id}">{event.title}</a>
{/each}

<h3>Past Events</h3>
<h4>{past.length} results found.</h4>
{#each past as event}
<a class="block" href="/event/{event.id}">{event.title}</a>
{/each}

<h3>FAQs</h3>
<h4>{faq.length} results found.</h4>
{#each faq as f}
{f}
{/each}