<script lang="ts">    
    import { myProfile } from '$lib/data/myProfile';
	import LoginForm from './LoginForm.svelte';

    export let loadProfile = (email:string) => {
        console.error('BypassLogin component instantiated without loadProfile function!')
    }

</script>

{#if $myProfile?.email}
<strong class="text-lg text-primary-500 text-center">Welcome {$myProfile.email}</strong>    	 
{:else}
<LoginForm loginAction={loadProfile} />
{/if}