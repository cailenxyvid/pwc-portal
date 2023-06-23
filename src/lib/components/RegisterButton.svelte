<script lang="ts">
	import type { Event } from '$lib/data/myTypes';

	import { myEvents } from '$lib/data/myEvents';

	import { isAlreadyRegistered } from '$lib/util/validationHelpers';
	import { registerEvent } from '$lib/util/registerEvent';

	export let cookie: string | undefined;
	export let event: Event;

	let disableButton = false;
	let alreadyRegistered = false;

	$: if ($myEvents) {
		alreadyRegistered = isAlreadyRegistered(event.id);
	}
</script>

{#if alreadyRegistered}
	<span class="btn variant-glass-primary">Registration saved</span>
{:else}
	<button
		disabled={disableButton}
		class="btn bg-primary-500 text-white mr-4 mb-2"
		on:click={async () => {
			disableButton = true;
			setTimeout(() => {
				// this is helpful for the modal login prompt and to prevent rapid clicks, but could be rethought
				disableButton = false;
			}, 3000);
			// would prefer something more stateful like the following, but would need to rethink flow to include pending and error states
			// alreadyRegistered = await registerEvent(event, cookie) ?? false;
			alreadyRegistered = true;
			registerEvent(event, cookie);
		}}
	>
		Register
	</button>
{/if}
