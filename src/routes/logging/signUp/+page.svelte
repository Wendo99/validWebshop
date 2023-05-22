<script lang="ts">
	import SignUp from './signUp.svelte';
	export let form;
	let error: string;
</script>

<!-- // TODO refactor error messages -->

<div class="min-h-screen">
	<h1 class="text-2xl font-semibold text-center">Sign Up</h1>

	<p class="mt-3 text-red-500 text-center font-semibold">
		{#if form?.error?.fieldErrors.password}
			{(error = form?.error?.fieldErrors.password.toString())}
		{:else if form?.error?.fieldErrors.email}
			{(error = form?.error?.fieldErrors.email.toString())}
		{:else}
			{(error = '')}
		{/if}
	</p>
	<SignUp class="max-w-xl mx-auto mt-16" />
</div>
