<script lang="ts">
	import ProductCartBox from './productCartBox.svelte';
	import ButtonDefault from '$lib/types/ButtonSubmit.svelte';
	import { getCurrencyString } from '$lib/utils/currencyUtils';
	export let data;

	let priceSum: string = getCurrencyString(data.priceSum);

	let piecesSum: string = data.piecesSum;
</script>

<svelte:head>
	<title>Juvenile &#8226; Your Basket</title></svelte:head
>
<main class="min-h-screen p-2">
	<h1 class="font-semibold text-2xl">Your Basket:</h1>
	<div class="grid grid-rows-2 grid-cols-12">
		<div class="row-start-1 max-w-3xl col-span-12">
			{#each data.prodArr as p}
				<ProductCartBox src={p[1]} title={p[3]} price={parseFloat(p[2])} qty={p[4]} />
			{/each}
		</div>
		<div
			class="border-6 bg-white rounded-md p-2 shadow-md drop-shadow-lg max-w-5xl justify-items-end row-start-2 col-span-12 grid grid-cols-12 grid-rows-2 h-fit border border-gray-200"
		>
			<div class="  text-sm font-bold row-start-2 col-start-9 self-center">
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
				<a href="/payment">
					<ButtonDefault>Proceed to Checkout</ButtonDefault>
				</a>
			</div>
		</div>
	</div>
</main>
