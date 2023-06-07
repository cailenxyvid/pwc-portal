<script lang="ts">
    let showLink = false;
    let url = window.location.href;
</script>
<div class="flex flex-row gap-4 items-center">
    <a href="https://www.facebook.com/sharer.php?u={url}"><i class="fa-brands fa-facebook"></i></a>
    <a href="https://twitter.com/intent/tweet?url={url}"><i class="fa-brands fa-twitter"></i></a>
    <a href="https://www.linkedin.com/shareArticle?mini=true&url={url}"><i class="fa-brands fa-linkedin"></i></a>
    <!-- svelte-ignore a11y-invalid-attribute :( --> 
    <a href="#" on:click={()=>{ showLink = !showLink }}><i class="fa-solid fa-share"></i></a>
</div>
{#if showLink}
<div class="block">
    <input type="text" class="t" value="{url}">
</div>
{/if}