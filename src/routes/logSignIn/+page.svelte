<script lang="ts">
    import SignInForm from '$lib/components/signInForm.svelte';
    let error: any;
</script>
<h1 class="text-2xl font-semibold text-center">Sign Up</h1>
{#if error}
    <p class="mt-3 text-red-500 text-center font-semibold">{error}</p>
{/if}
<SignInForm class="max-w-xl mx-auto mt-8" />