<script lang="ts">
	import { enhance } from '$app/forms';
	import { isValidEmail } from "$lib/util/validationHelpers";	
	
	const validate = (e: SubmitEvent) => {				
		if (isValidEmail(email)) {
			e.target.submit();						
		} else {
			showError = true;
			return false;
		}
	}
	let email = ''
	let showError = false;
</script>

<!-- <form method="post" action="/login" use:enhance={({ cancel }) => {
	if (!isValidEmail(email)) {
		showError = true;
		cancel();
	}
	return async ({ update }) => {
            update(); // on success, trigger default behavior
        };
}}> -->
<b>LoginForm component</b>
<form action="/login" id="loginForm" method="post" on:submit|preventDefault={validate}>
	<input
		type="email"
		name="email"
		id="email"
		bind:value={email}
		placeholder="Email address"
		class="sm:w-2/4 md:w-64 md:mb-2"
	/>
	{#if showError}<div class="variant-filled-error p-1 my-1">Please enter a valid email address.</div>{/if}
	<button type="submit" class="btn bg-primary-500 text-white">Continue</button>	
</form>
