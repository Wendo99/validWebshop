<script lang="ts">
	import AddToCartBtn from '../AddToBasketBtn.svelte';
	import { enhance } from '$app/forms';

	import ProdRate from '$lib/components/ProdRate.svelte';
	import ProdCount from '$lib/components/ProdCount.svelte';


	export let data;

	const id = data.product.id;
	const title: string = data.product.title;
	const price: number = data.product.price;
	const description: string = data.product.description;
	const image: string = data.product.image;
	const count = data.product.count;
	const rate = data.product.rate;
</script>

<svelte:head><title>Donkey Shopping</title></svelte:head>

<main class="min-h-screen mt-12 grid justify-items-center">
	<div class="grid grid-rows-2 p-2 gap-y-12 max-w-max">
		<div class="grid grid-flow-col max-w-5xl gap-12 justify-start">
			<div class="grid max-w-max">
				<img src={image} width="250" height="250" alt="product pic " class="grid max-w-md h-auto" />
			</div>

			<div class="grid max-w-max text-lg">
				<div id="title" class="text-2xl font-medium text-gray-700 max-w-max">{title}</div>
				<!-- <div id="category" class="">{category}</div> -->
				<div class="grid grid-cols-2 items-center justify-items-end">
					<div id="price" class=" text-xl text-gray-900 font-bold max-w-max justify-self-start">
						{price} €
					</div>

					<form action="/cart?/addToCart" method="post" use:enhance>
						<input type="hidden" name="prodId" value={id} />
						<AddToCartBtn {id} />
					</form>
				</div>
				<div class="grid grid-cols-2 max-w-max">
					<ProdCount {count} />
					<ProdRate {rate} />
				</div>
			</div>
		</div>

		<div id="description" class="grid max-w-5xl text-lg text-gray-700">{description}</div>
	</div>
</main>
