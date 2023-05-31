<script lang="ts">
	import SignIn from './signIn.svelte';
	import { fade } from 'svelte/transition';

	export let form;

	let hasErrorMessage = false;

	$: if (form?.errorMessage != undefined) {
		hasErrorMessage = true;
		errorMessageTimer();
	} else {
		hasErrorMessage = false;
	}
	function errorMessageTimer() {
		setTimeout(() => {
			hasErrorMessage = false;
		}, 2000);
	}
</script>

<svelte:head><title>Juvenile &#8226; Sign In</title></svelte:head>

<div class="min-h-screen">
	<h1 class="text-2xl font-semibold text-center">Sign In</h1>
	<p class=" mt-3 text-red-500 text-center font-semibold " />
	<SignIn class="max-w-xl mx-auto mt-16 ">
		<h2 out:fade class="{hasErrorMessage ? '' : 'invisible'} text-red-500 text-center">{form?.errorMessage}</h2>
	</SignIn>
	<a href="/logging/signUp" class="hover:underline hover: underline-offset-2 hover:decoration-gray-500">
		<div class="text-xs font-medium text-gray-500 text-center">Don't have an Account yet ?</div>
	</a>
</div>
