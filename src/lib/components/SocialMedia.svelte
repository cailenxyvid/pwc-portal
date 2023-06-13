<script lang="ts">
    import { browser } from "$app/environment";
    import { clipboard } from '@skeletonlabs/skeleton';
    import { displaySuccess } from "$lib/util/displayToast";
    // import { clickOutside } from "$lib/util/clickOutside";
    export let event_id = '';
    // let showLink = false;
    let url = '' ;
    if (browser) {url = window.location.origin + '/event/' + event_id }
    const copyLink = () => {
        let input =  document.getElementById('socialLink');
        input.select();
        input.setSelectionRange(0, 99999); // for mobile

        navigator.clipboard.writeText(input.value);
        displaySuccess('Link copied to clipboard')
    }
</script>
<div class="flex flex-row gap-4 items-center">
    <a href="https://www.facebook.com/sharer.php?u={url}" target="_blank"><i class="fa-brands fa-facebook"></i></a>
    <a href="https://twitter.com/intent/tweet?url={url}" target="_blank"><i class="fa-brands fa-twitter"></i></a>
    <a href="https://www.linkedin.com/shareArticle?mini=true&url={url}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
    <!-- svelte-ignore a11y-invalid-attribute :( --> 
    <a href="#" on:click={copyLink}><i class="fa-solid fa-share"></i></a>
    <!-- <button use:clipboard={url}><i class="fa-solid fa-share"></i></button>     -->
</div>
<input class="hidden" type="text" id="socialLink" value="{url}">
<!-- {#if showLink}
<div use:clickOutside on:outclick={() => (showLink = false)}>
    <input type="text" class="variant-ghost-primary" value="{url}">
</div>
{/if} -->