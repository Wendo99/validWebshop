<script lang="ts">
	import Input from '../../lib/components/input_logging.svelte';
	import Button from '../../lib/components/btn_Logging.svelte';
	let email = '';
	let password: string = '';
	let confirmPassword: string = '';

	function validatePassword(password: any, confirmPassword: any) {
		return confirmPassword !== password;
	}
</script>

<form method="POST" action="?/register" class="space-y-5 {$$props.class}">
	<Input label="Email" id="email" name="email" type="email" bind:value={email} />
	<Input label="Password" id="password" name="password" type="password" bind:value={password} />
	<Input
		label="Confirm Password"
		id="confirm-password"
		name="confirm-password"
		type="password"
		bind:value={confirmPassword}
	/>
	{#if confirmPassword !== '' && confirmPassword !== password}
		<p class="text-red-600 text-sm font-semibold">Password not match</p>
	{/if}
	<Button type="submit" disabled={validatePassword(password, confirmPassword)}>Sign Up</Button>
</form>
