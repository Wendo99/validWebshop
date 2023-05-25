<script lang="ts">
	import ButtonLogging from '../ButtonLogging.svelte';
	import InputLogging from '../InputLogging.svelte';

	let email = '';
	let password = '';
</script>

<form action="?/login" method="post" class="space-y-5 {$$props.class}">
	<InputLogging label="Email" id="email" name="email" type="email bind:value={email} " required />
	<InputLogging 
	class="tracking-widest"
		label="Password"
		id="password"
		name="password"
		type="password"
		bind:value={password}
		required
	/>
	<ButtonLogging>Sign In</ButtonLogging>
</form>
