<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData, ActionData } from './$types';
    import CreateProfile from "$lib/components/User/CreateProfile.svelte";

    export let data: PageData;
    export let form: ActionData;

    let { profile } = data;

    onMount(() => {
        if (form?.missingFields) {
            form.missingFields.forEach((f) => {
                let el = document.getElementsByName(f)[0]; 
                el.classList.add('variant-ringed-error');
            })
        }
    })
</script>

<div class="max-w-md">
    {#if form?.error}
	<p class="variant-filled-error p-4 rounded-sm">{form.error}</p>
    {/if}
    <CreateProfile {profile} />
</div>