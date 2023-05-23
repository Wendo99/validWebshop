<script lang="ts">
	import AddToCartBtn from '../ButtonAddProdToBasket.svelte';
	import { enhance } from '$app/forms';
	import ProdRate from '$lib/components/ProdRate.svelte';
	import ProdCount from '$lib/components/ProdCount.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';

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

<main class="grid  justify-items-center">
	<div class="grid grid-rows-2 max-w-4xl gap-y-6 border">
		<div class="row-start-1 grid grid-col-12 gap-x-11">
			<div class="col-start-1 grid place-items-center">
				<ImageDefault src={image} width="300" height="300" alt="productpic" />
			</div>

			<div class="col-start-2 col-span-11 grid grid-rows-3 text-lg">
				<div class="text-3xl font-medium text-gray-700 row-start-1">{title}</div>
				<!-- <div id="category" class="">{category}</div> -->
				<div class="grid grid-cols-2 row-start-2 items-center">
					<div id="price" class=" text-xl text-gray-900 font-bold">
						{price} €
					</div>

					<form action="/cart?/addToCart" method="post" use:enhance class=" justify-self-end">
						<input type="hidden" name="prodId" value={id} />
						<AddToCartBtn {id} class="" />
					</form>
				</div>
				<div class="grid grid-cols-2 max-w-max row-start-3 items-end gap-x-6">
					<ProdCount {count} />
					<ProdRate {rate} />
				</div>
			</div>
		</div>

		<div id="description" class="row-start-2 text-lg text-gray-700 border text-justify">{description}</div>
	</div>
</main>
