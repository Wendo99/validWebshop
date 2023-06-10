<script lang="ts">
	import ButtonAccount from './ButtonAccount.svelte';
	import ButtonBasket from './ButtonBasket.svelte';
	import ButtonLoginLogout from './ButtonLoginLogout.svelte';

	export let userEmail: string | null;
</script>

<header
	{...$$restProps}
	class="mb-9 text-white bg-black p-2 grid grid-cols-2 items-center {$$restProps.class}"
>
	<div class=" grid grid-flow-col justify-start gap-3 items-center py-2">
		<a href="/"
			><img src="/juvenileLogo.png" width="96" height="96" alt="company logo black donkey" /></a
		>
		<h2 id="compHeader" class="text-5xl font-headline">Juvenile</h2>
	</div>
	<div class=" grid col-start-2 grid-flow-col items-center text-sm justify-end gap-8">
		{#if userEmail == null}
			{''}
		{:else}
			{userEmail}
		{/if}
		<ButtonLoginLogout {userEmail} />
		<ButtonAccount />
		<ButtonBasket />
	</div>
</header>
