<script lang="ts">
	import SignIn from './signIn.svelte';
</script>

<svelte:head><title>Sign In</title></svelte:head>
<!-- //TODO error messges -->
<div class="min-h-screen">
	<h1 class="text-2xl font-semibold text-center">Sign In</h1>
	<p class=" mt-3 text-red-500 text-center font-semibold" />
	<SignIn class="max-w-xl mx-auto mt-16" />
	<!-- TODO make up the account link -->
	<a href="/logging/signUp">
		<div class="text-sm font-medium text-gray-500 text-center">Don't have an Account yet ?</div>
	</a>
</div>
