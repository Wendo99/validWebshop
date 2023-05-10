<script lang="ts">
	import UserRatingCounter from '$lib/userRatingCounter.svelte';
	import StarRating from '$lib/starRating.svelte';
	import type { Rating } from './+page.server';
	import AddToCartBtn from '$lib/components/addToCartBtn.svelte';

	export let data;
	let prop = data.product;

	const id: number = prop.id;
	const title: string = prop.title;
	const price: number = prop.price;
	const description: string = prop.description;
	const category: string = prop.category;
	const image: string = prop.image;
	const rating: Rating = prop.rating;
	
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

					<AddToCartBtn {id}/>
				</div>
				<div class="grid grid-cols-2 max-w-max">
					<UserRatingCounter {rating} />
					<StarRating {rating} />
				</div>
			</div>
		</div>

		<div id="description" class="grid max-w-5xl text-lg text-gray-700">{description}</div>
	</div>
</main>
