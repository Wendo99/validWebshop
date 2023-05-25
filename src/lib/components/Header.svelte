<script lang="ts">
	import ButtonAccount from './ButtonAccount.svelte';
	import ButtonBasket from './ButtonBasket.svelte';
	import ButtonLoginLogout from './ButtonLoginLogout.svelte';

	export let userEmail: string | undefined;
</script>

<header {...$$restProps} class="grid grid-cols-2 items-center {$$restProps.class}">
	<div class=" grid grid-flow-col justify-start gap-3 items-center py-2">
		<a href="/"
			><img src="/logo_872x872.png" width="96" height="96" alt="company logo black donkey" /></a
		>
		<h2 id="compHeader" class="text-5xl">Donkey</h2>
	</div>
	<div class=" grid col-start-2 grid-flow-col items-center">
		<div class="">
			{#if userEmail == undefined}
				{''}
			{:else}
				{userEmail}
			{/if}
		</div>
		<ButtonLoginLogout {userEmail} />
		<ButtonAccount />
		<ButtonBasket />
	</div>
</header>
