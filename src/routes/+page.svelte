<script lang="ts">
	import User from "$lib/components/User.svelte";
	import type { PageData } from './$types';

  	export let data: PageData;
	console.log(data)
</script>
    
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="flex flex-row h-full pt-16">
		<div class="w-3/4">
			Events
		</div>
		<div class="bg-surface-900 h-full">
			<User session={data.session} />
		</div>
	</div>	
</div>
