<script lang="ts">
	import type { Event } from '$lib/data/myTypes';
	import { PUBLIC_XYP_PORTAL_URL } from '$env/static/public';
	import { myProfile } from '$lib/data/myProfile';
	import { buttonCheck } from '$lib/util/validationHelpers';
	import { trackAction } from '$lib/util/trackAction';
	import { registerEvent } from '$lib/util/registerEvent';

	const watchNow = async () => {
		if (buttonCheck(cookie) && cookie) {
			await registerEvent(event, cookie);
			trackAction(cookie ?? '', 'watch_replay', event.id);
			window.open(
				PUBLIC_XYP_PORTAL_URL +
					event.xyp_id +
					'?emailAddress=' +
					$myProfile.email +
					'&directEntry=true',
				'_blank'
			);
		}
	};

	export let event: Event;
	export let cookie: string | undefined;
</script>

<button
	on:click={watchNow}
	class="btn text-white {event.featured
		? 'bg-primary-500 hover:bg-[#2d2d2d]'
		: 'bg-[#2d2d2d] hover:bg-primary-500'}">Watch now</button
>
