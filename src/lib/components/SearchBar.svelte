<script lang="ts">
    import { slide } from "svelte/transition";
    let show = false;
    const toggle = () => { show = !show }
</script>

<button on:click={toggle}><i class="inline-block fa fa-search"></i></button>
{#if show}
<form action="/search" class="inline-block ml-4" transition:slide>
    <input type="text" name="queryString" />
    <button class="variant-filled-primary p-2">Go</button>
</form>
{/if}