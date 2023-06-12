<script lang='ts'>
	// skeleton.dev and branded theme styles - changing the order of these may break things
	import '../../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../../app.postcss'; // do explict global overrides here, if needed
</script>

<div class="container h-full mx-auto flex justify-center items-center">
    <slot />
</div>
