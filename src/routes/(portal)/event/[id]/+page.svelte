<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let { event } = data;    
</script>

<h2>{event.title}</h2>