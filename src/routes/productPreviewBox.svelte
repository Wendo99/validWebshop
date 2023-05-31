<script lang="ts">
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	import ProdCount from '$lib/components/ProdCount.svelte';
	import ProdRate from '$lib/components/ProdRate.svelte';
	import { getCurrencyString } from '$lib/utils/currencyUtils';
	import type { Product } from './+page.server';

	export let product: Pick<Product, 'id' | 'image' | 'title' | 'price' | 'count' | 'rate'>;
</script>

<a href="/product/{product.id}">
	<div
		class="grid grid-flow-row justify-items-center items-center border-6 w-64 h-96 p-3 rounded-md bg-white shadow-md drop-shadow-md mb-16 hover:drop-shadow-2xl hover:shadow-2xl border border-gray-200"
	>
		<div class="bg-white rounded-md grid items-center justify-items-center w-48 h-48">
			<div class="items-center justify-items-center">
				<ImageDefault src={product.image} width="110" height="110" alt="product" />
			</div>
		</div>

		<div class="font-semibold text-center tracking-widest text-gray-700">{product.title}</div>

		<div class="text-xl tracking-widest text-gray-600">{getCurrencyString(product.price)}</div>

		<div class=" grid grid-flow-col auto-cols-fr gap-x-4">
			<ProdCount count={product.count} />
			<ProdRate rate={product.rate} />
		</div>
	</div></a
>
