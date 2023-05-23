<script lang="ts">
	import ButtonBasket from './ButtonBasket.svelte';
	import ButtonLoginLogout from './ButtonLoginLogout.svelte';

	export let userEmail: string | undefined;
</script>

<header class="rounded-lg grid grid-cols-2 items-start">
	<div class=" grid grid-flow-col justify-start gap-3 items-center py-2">
		<a href="/"
			><img src="/logo_872x872.png" width="96" height="96" alt="company logo black donkey" /></a
		>
		<h2 id="compHeader" class="text-5xl">Donkey</h2>
	</div>
	<div class=" grid grid-rows-4 col-start-2 grid-cols-12">
		<div
			class="grid row-start-2 items-center justify-items grid-flow-col row-span-3 justify-items-end col-span-12"
		>
			<ButtonLoginLogout {userEmail} />
			<ButtonBasket />
		</div>
		<div class=" row-start-5 col-span-4 col-start-4 text-center">
			{#if userEmail == undefined}
				{''}
			{:else}
				{userEmail}
			{/if}
		</div>
	</div>
</header>
