<script lang="ts">
	import AddToCartBtn from '../ButtonAddProdToBasket.svelte';
	import { enhance } from '$app/forms';
	import ProdRate from '$lib/components/ProdRate.svelte';
	import ProdCount from '$lib/components/ProdCount.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	import { getCurrencyString } from '$lib/utils/currencyUtils';

	export let data;

	const id = data.product.id;
	const title: string = data.product.title;
	const price: number = data.product.price;
	const description: string = data.product.description;
	const image: string = data.product.image;
	const count = data.product.count;
	const rate = data.product.rate;
</script>

<svelte:head><title>Donkey Shopping - {title}</title></svelte:head>

<main class="grid justify-items-center min-h-screen">
	<div class="grid grid-rows-2 max-w-4xl">
		<div class="row-start-1 grid grid-col-12 gap-x-11">
			<div class="col-start-1 grid place-items-center">
				<ImageDefault src={image} width="300" height="300" alt="productpic" />
			</div>

			<div class="col-start-2 col-span-11 grid grid-rows-3 text-lg">
				<div class="text-3xl font-medium text-gray-700 row-start-1">{title}</div>
				<!-- <div id="category" class="">{category}</div> -->
				<div class="grid grid-cols-2 row-start-2 items-center">
					<div id="price" class=" text-xl text-gray-900 font-bold">
						{getCurrencyString(price)}
					</div>

					<form action="/cart?/addToCart" method="post" use:enhance>
						<input type="hidden" name="prodId" value={id} />
						<AddToCartBtn {id}  />
					</form>
				</div>
				<div class="grid grid-cols-2 max-w-max row-start-3 items-center gap-x-6">
					<ProdCount {count} width="20" height="20" />
					<ProdRate {rate} width="20" height="20" />
				</div>
			</div>
		</div>

		<div id="description" class="row-start-2 text-lg text-gray-700 text-justify">
			{description}
		</div>
	</div>
</main>
