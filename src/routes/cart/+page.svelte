<script lang="ts">
	import ProductCartBox from './productCartBox.svelte';
	import ButtonDefault from '$lib/types/ButtonSubmit.svelte';
	import { getCurrencyString } from '$lib/utils/currencyUtils';
	export let data;

	let priceSum: string = getCurrencyString(data.priceSum);

	let piecesSum: string = data.piecesSum;
</script>

<main class="min-h-screen">
	<div class="grid grid-rows-2 grid-cols-12">
		<div class="row-start-1 max-w-3xl col-span-12">
			{#each data.prodArr as p}
				<ProductCartBox src={p[1]} title={p[3]} price={parseFloat(p[2])} qty={p[4]} />
			{/each}
		</div>
		<div
			class="  bg-blue-50 rounded-lg p-2 shadow-2xl drop-shadow-md max-w-5xl justify-items-end row-start-2 col-span-12 grid grid-cols-12 grid-rows-2 h-fit"
		>
			<div class="  text-sm font-bold text-gray-500 row-start-2 col-start-9 self-center">
				{#if piecesSum != undefined}
					{piecesSum}
					{#if piecesSum == '1'}
						piece
					{:else}
						pieces
					{/if}
				{/if}
			</div>
			<div class=" text-lg font-bold text-gray-600 col-start-9 self-end">
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
