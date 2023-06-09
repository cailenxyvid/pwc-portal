<script lang="ts">
    import { browser } from "$app/environment";
    import { clickOutside } from "$lib/util/clickOutside";
    export let event_id = '';
    let showLink = false;
    let url = '' ;
    if (browser) {url = window.location.origin + '/event/' + event_id }
</script>
<div class="flex flex-row gap-4 items-center">
    <a href="https://www.facebook.com/sharer.php?u={url}" target="_blank"><i class="fa-brands fa-facebook"></i></a>
    <a href="https://twitter.com/intent/tweet?url={url}" target="_blank"><i class="fa-brands fa-twitter"></i></a>
    <a href="https://www.linkedin.com/shareArticle?mini=true&url={url}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
    <!-- svelte-ignore a11y-invalid-attribute :( --> 
    <a href="#" on:click={()=>{ showLink = !showLink }}><i class="fa-solid fa-share"></i></a>
</div>
{#if showLink}
<div use:clickOutside on:outclick={() => (showLink = false)}>
    <input type="text" class="variant-ghost-primary" value="{url}">
</div>
{/if}