<script lang="ts">
	import type { Event } from '$lib/data/myTypes';
	import { buttonCheck } from '$lib/util/validationHelpers';
	import { trackAction } from '$lib/util/trackAction';

	const actionGuide = () => {
		if (buttonCheck(cookie)) {
			trackAction(cookie ?? '', 'download_action_guide', event.id);
			window.open(event.action_guide, '_blank');
		}
	};

	export let event: Event;
	export let cookie: string | undefined;
</script>

<button
	on:click={actionGuide}
	class="btn text-white {event.featured
		? 'bg-primary-500 hover:bg-[#2d2d2d]'
		: 'bg-[#2d2d2d] hover:bg-primary-500'}"
	disabled={!event.action_guide}>Action guide</button
>
