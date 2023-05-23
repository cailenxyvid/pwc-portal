<script lang="ts">
    export let loginAction = (email: string) => {
        console.error('LoginForm component instantiated without loginAction function!')
    };
    let email = '';
    let submit = () => {
        console.log('firing loginAction for email: ' + email)
        loginAction(email)
    }
</script>

<form on:submit|preventDefault={submit} class="text-center">
    <input type="email" name="email" id="email" placeholder="email" class="sm:w-2/4 md:w-full md:mb-2" bind:value={email} />
    <button type="submit" class="variant-filled-primary p-2 rounded-sm sm:w-2/4 md:w-full">Continue</button>
    <!-- <div class="text-sm italic text-secondary-500">You will recieve an email with an optional validation link.</div> -->
</form>	