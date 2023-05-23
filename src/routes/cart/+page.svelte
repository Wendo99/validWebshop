<script lang="ts">
	import ProductCartBox from './productCartBox.svelte';
	import ButtonDefault from '$lib/types/ButtonSubmit.svelte';
	export let data;

	let priceSum: string = parseFloat(data.priceSum).toPrecision(5);
	let piecesSum: string = data.piecesSum;
</script>

<div class="grid grid-rows-2 mt-20 min-h-screen">
	<div class=" grid row-start-1 max-w-3xl">
		<div class="">
			{#each data.prodArr as p}
				<ProductCartBox src={p[1]} title={p[3]} price={parseFloat(p[2])} qty={p[4]} />
			{/each}
		</div>
	</div>
	<div
		class="grid bg-blue-50 rounded-lg p-2 shadow-2xl drop-shadow-md opacity-90 h-16 ml-9 max-w-5xl grid-cols-12 items-center justify-items-end row-start-2"
	>
		<div class="grid text-sm font-bold text-gray-500 w-20 col-start-7 items-center">
			{#if piecesSum != undefined}
				{piecesSum}
				{#if piecesSum == '1'}
					piece
				{:else}
					pieces
				{/if}
			{/if}
		</div>
		<div class="text-lg grid font-bold text-gray-600 w-24 col-start-9 items-center">
			{#if priceSum != undefined}
				{priceSum} €
			{/if}
		</div>
		<div class=" col-start-10 col-span-4 items-center">
			<a href="/payment">
				<ButtonDefault>Proceed to Checkout</ButtonDefault>
			</a>
		</div>
	</div>
</div>
