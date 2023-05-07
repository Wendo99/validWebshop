<script lang="ts">
	import Count from '$lib/count.svelte';
	import StarRating from '$lib/starRating.svelte';
	import type { Rating } from './+page.server';
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

<main class="min-h-screen max-w-max ">
	<div class="grid grid-rows-2 p-2 gap-y-12">
		<div class="grid grid-flow-col max-w-5xl gap-12 border justify-end">
			<div class="grid max-w-max border">
				<img
					src={image}
					width="250"
					height="250"
					alt="product pic "
					class="grid max-w-md h-auto  border"
				/>
			</div>

			<div class="grid max-w-max text-lg border ">
				<div id="title" class="text-2xl font-medium text-gray-700 max-w-max">{title}</div>
				<!-- <div id="category" class="">{category}</div> -->
				<div id="price" class="text-gray-900 font-bold max-w-max">{price} €</div>
				<div class="grid grid-cols-2 max-w-max">
					<Count {rating} />
					<StarRating {rating} />
				</div>
			</div>
		</div>

		<div id="description" class="grid max-w-5xl text-lg text-gray-700 border">{description}</div>
	</div>
</main>
