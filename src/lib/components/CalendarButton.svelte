<script lang="ts">
	import { clickOutside } from '$lib/util/clickOutside';

	import type { Event } from '$lib/data/myTypes';

	export let event: Event;

	let toggle = () => {
		if (clickOutFired) {
			clickOutFired = false;
			return;
		} else if (!show) {
			show = true;
		}
	};

	let clickOut = () => {
		show = false;
		clickOutFired = true;
		setTimeout(() => {
			clickOutFired = false;
		}, 500); //# wtf man. this is ugly af but works (for now).
	};

	let show = false;
	let clickOutFired = false; //# i hate this
</script>

{#if event.calendar_id}
	<button class="variant-filled-primary" on:click={toggle}>
		Add to calendar
		<i class="fa-solid fa-chevron-{show ? 'up' : 'down'}" />
	</button>
	{#if show}
		<div
			use:clickOutside
			on:outclick={clickOut}
			class="p-6 rounded-sm absolute right-0 bg-surface-200"
		>
			<a
				href="https://www.addevent.com/event/{event.calendar_id}+outlook"
				on:click={() => {
					show = false;
				}}
				target="_blank"
				class="block">Outlook</a
			>
			<a
				href="https://www.addevent.com/event/{event.calendar_id}+google"
				on:click={() => {
					show = false;
				}}
				target="_blank"
				class="block">Google</a
			>
			<a
				href="https://www.addevent.com/event/{event.calendar_id}+apple"
				on:click={() => {
					show = false;
				}}
				target="_blank"
				class="block">Apple</a
			>
			{#if event.pwc_calendar_link}
				<a
					href={event.pwc_calendar_link}
					target="_blank"
					on:click={() => {
						show = false;
					}}
					class="block">PwC Desktop</a
				>
			{/if}
		</div>
	{/if}
{:else}
	<div class="text-xl variant-filled-error text-white">Missing calendar link!</div>
{/if}
