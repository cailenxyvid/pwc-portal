<script lang="ts">
	import { blur } from 'svelte/transition';
	export let show = false;
	// const toggle = () => {
	// 	show = !show;
	// };
</script>

<!-- <button on:click={toggle}><i class="inline-block fa fa-search pt-5 pb-5" /></button>
{#if show}
	<form action="/search" class="inline-block ml-1 sm:ml-4" transition:blur>
		<input type="text" name="queryString" class="md:w-48 text-black" />
		<button class="btn p-2">Go</button>
	</form>
{/if} -->

<form action="/search" class="inline-block ml-4">
	<input type="text" name="queryString" class="md:w-48 text-black" placeholder="Search..." />
	<button class="btn bg-primary-500 text-white"><i class="fa fa-search" /></button>
</form>

<!-- <style>
	button:hover,
	.active {
		color: #d04a02;
	}
</style> -->

<style>
	input {
		border: solid #2d2d2d 1px;
	}
</style>
