<script lang="ts">

	import ProductCartBox from './productCartBox.svelte';
	import BtnSubmit from '$lib/components/btn_submit.svelte';
	
	export let data;
	let priceSum = data.priceSum;
	let piecesSum = data.piecesSum;

</script>

<div class="grid auto-rows-min min-h-screen">
	<div class=" grid row-start-1 max-h-min grid-cols-12">
		<div class="grid col-span-6">
			{#each data.productArray as p}
				<ProductCartBox
					src={p.image}
					title={p.title}
					price={p.price}
					qty={data.userCart[p.id - 1]}
				/>
			{/each}
		</div>
		<div class="grid col-start-8 col-span-2 items-center">
			<form action="/payment?/paymentProcessing" method="post">
				<input type="hidden" name="productArr" value={data.productArray} />
				<BtnSubmit text="Proceed to Checkout" />
			</form>
		</div>
	</div>
	<div
		class="grid bg-slate-200 border rounded-xl p-2 shadow-2xl drop-shadow-md opacity-90 h-16 mb-7 ml-9 w-2/4 grid-cols-12 auto-cols-auto items-center justify-items-end"
	>
		<div class="border grid col-start-9 text-sm font-bold text-gray-500">
			{#if piecesSum != undefined}
				{piecesSum}
				{#if piecesSum > 1}
					pieces
				{:else}
					piece
				{/if}
			{/if}
		</div>
		<div class="border grid font-bold text-gray-600 col-start-11 min-w-fit">
			{#if priceSum != undefined}
				{priceSum} €
			{/if}
		</div>
	</div>
</div>
