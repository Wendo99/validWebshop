<script lang="ts">
	import SignIn from '$lib/components/signIn.svelte';
	export let form;
</script>

<h1 class="text-2xl font-semibold text-center">Sign In</h1>

{#if form?.message}
	<p class=" mt-3 text-red-500 text-center font-semibold">{form.message}</p>
{/if}

<SignIn class="max-w-xl mx-auto mt-8" />
