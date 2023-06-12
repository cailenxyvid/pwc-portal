<script lang="ts">
    import type { PageData } from './$types';
    import CreateProfile from "$lib/components/User/CreateProfile.svelte";
    export let data: PageData;
    let { profile } = data;
</script>

<div class="max-w-md">
    <CreateProfile {profile} />
</div>