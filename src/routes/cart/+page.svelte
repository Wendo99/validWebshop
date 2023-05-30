<script lang="ts">
	import ProductCartBox from './productCartBox.svelte';
	import { getCurrencyString } from '$lib/utils/currencyUtils';

	import { goto } from '$app/navigation';
	import button from '$lib/types/ButtonDefault.svelte';
	export let data;

	let priceSum: string = getCurrencyString(data.priceSum);
	let piecesSum: string = data.piecesSum;

	export function checkLogginStatus() {
		console.log('1');
	return console.l
	}
</script>

<svelte:head>
	<title>Juvenile &#8226; Your Basket</title></svelte:head
>
<main class="min-h-screen p-2">
	<h1 class="text-3xl font-bold mb-12">Your Basket</h1>
	<div class="grid grid-rows-2 grid-cols-12">
		<div class="row-start-1 max-w-3xl col-span-12">
			{#each data.prodArr as p}
				<ProductCartBox src={p[1]} title={p[3]} price={parseFloat(p[2])} qty={p[4]} />
			{/each}
		</div>
		<div
			class="border-6 bg-white rounded-md p-2 shadow-md drop-shadow-lg max-w-5xl justify-items-end row-start-2 col-span-12 grid grid-cols-12 grid-rows-2 h-fit border border-gray-200"
		>
			<div class="   row-start-2 col-start-9 self-center text-gray-500">
				{#if piecesSum != undefined}
					{piecesSum}
					{#if piecesSum == '1'}
						piece
					{:else}
						pieces
					{/if}
				{/if}
			</div>
			<div class=" text-lg font-bold col-start-9 self-end">
				{#if priceSum != undefined}
					{priceSum}
				{/if}
			</div>
			<div class=" col-start-12 row-span-2 self-center">
				<button on:click={checkLogginStatus} type="button">Ok</button>
			</div>
		</div>
	</div>
</main>
