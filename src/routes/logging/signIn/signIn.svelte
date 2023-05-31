<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import ButtonLogging from '../ButtonLogging.svelte';
	import InputLogging from '../InputLogging.svelte';

	let email = '';
	let password = '';

	export let returnTo = $page.url.searchParams.get('returnTo');
</script>

<form action="?/login" method="post" class="space-y-5 {$$props.class} " use:enhance>
	<slot />
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
	<input type="hidden" name="returnTo" value={returnTo} />
	<ButtonLogging>Sign In</ButtonLogging>
</form>
