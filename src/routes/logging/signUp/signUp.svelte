<script lang="ts">
	import ButtonLogging from '../ButtonLogging.svelte';
	import InputLogging from '../InputLogging.svelte';

	//XXX how to handle the email, password and confirmpassword vars ?
	let email = '';
	let password: string = '';
	let confirmPassword: string = '';

	function validatePassword(password: any, confirmPassword: any) {
		return confirmPassword !== password;
	}
</script>

<form method="POST" action="?/register" class="space-y-5 {$$props.class}">
	{#if confirmPassword !== '' && confirmPassword !== password}
		<p class="text-red-500 text-center">Password is not matching</p>
	{:else}
		<br />
	{/if}
	<InputLogging label="Email" id="email" name="email" type="email" bind:value={email} required />
	<InputLogging
		class="tracking-widest"
		label="Password"
		id="password"
		name="password"
		type="password"
		bind:value={password}
		required
	/>
	<InputLogging
		class="tracking-widest"
		label="Confirm Password"
		id="confirm-password"
		name="confirm-password"
		type="password"
		bind:value={confirmPassword}
		required
	/>
	<ButtonLogging disabled={validatePassword(password, confirmPassword)}>Sign Up</ButtonLogging>
</form>
