<script lang="ts">
    import { blur } from "svelte/transition";
    let show = false;
    const toggle = () => { show = !show }
</script>

<button on:click={toggle}><i class="inline-block fa fa-search pt-5 pb-5"></i></button>
{#if show}
<form action="/search" class="inline-block ml-1 sm:ml-4" transition:blur>
    <input type="text" name="queryString" class="w-20 md:w-48 text-black" />
    <button class="variant-filled-primary p-2">Go</button>
</form>
{/if}