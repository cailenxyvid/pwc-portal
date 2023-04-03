<script lang="ts">
    import type { Session } from '@supabase/supabase-js';  
	export let session: Session | null;

    export let updateProfile: any
</script>

{#if session}
<div class="w-full flex-col space-y-4 mt-10">
    <form on:submit|preventDefault={updateProfile}>
        <label for="first_name">
            <div class="font-bold">First Name*</div>
            <input class="w-full" type="text" id="first_name" name="first_name" required />
        </label>
        <label for="last_name">
            <div class="font-bold">Last Name*</div>
            <input class="w-full" type="text" id="last_name" name="last_name" required />
        </label>
        <label for="company">
            <div class="font-bold">Company*</div>
            <input class="w-full" type="text" id="company" name="company" required />
        </label>
        <label for="email">
            <div class="font-bold">Email*</div>
            <input class="w-full" type="text" id="email" name="email" value={session.user.email} disabled />
        </label>
        <label for="job_level">
            <div class="font-bold">Job Level*</div>
            <select class="w-full" name="job_level" id="job_level">
                <option value="">Select One</option>
                <option value="Corporate Board Member">Corporate Board Member</option>
                <option value="C Level">C Level</option>
                <option value="Business Unit Leader">Business Unit Leader</option>
                <option value="VP">VP</option>
                <option value="Director">Director</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Other">Other</option>
            </select>
        </label>
        <label for="job_title">
            <div class="font-bold">Job Title*</div>
            <input class="w-full" type="text" id="job_title" name="job_title" required />
        </label>
        <label for="country">
            <div class="font-bold">Country*</div>
            <select name="country" id="country" class="w-full">
                
            </select>
        </label>
        <button type="submit" class="bg-primary-500 rounded-sm p-2 mt-4 w-full">Save</button>
    </form>
</div>
{:else}
<div class="text-error-500 text-2xl">Error retrieving user data</div>
{/if}