<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    const { list } = data;
</script>

<div class="p-6">    
    <h2>Past CPE Events</h2>
    {#each list as event}
    <div>
        <!-- <span class="w-96">
            {new Date(event.event_start).toLocaleString('en-US', {					
                dateStyle: 'full'
            })}
        </span> -->
        <span>
            <a href="/event/{event.id}">{event.title}</a>
        </span>
    </div>
    {/each}
</div>