<script lang="ts">
    import type { Event } from "$lib/data/myTypes";
    import { page } from '$app/stores';
    export let event:Event;
    
    let query: string | null;

    const highlight = (text:string) => {                
        if (!query) return;
        let queryString = ' '+query;
        let regEx = new RegExp(queryString, "ig");
        return text.replace(regEx, `<b class="highlight">${queryString}</b>`)        
    }

    $: (query = $page.url.searchParams.get('queryString'))
</script>

{#key query}
<div class="card p-2 overflow-scroll overflow-ellipsis text-xs">
    <a class="block" href="/event/{event.id}">{@html highlight(event.title)}</a>
    <div class="prose">
        {@html highlight(event.content)}
    </div>
</div>
{/key}