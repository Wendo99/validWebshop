<script lang="ts">
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

<div class="p-2 grid grid-cols-4 grid-rows-2 gap-3 text-lg min-h-screen">
	<div class=" grid grid-flow-col col-start-2 h-72">
		<img src={image} width="600" height="600" alt="product pic" />
		<div class=" p-2 grid grid-row-7">
			<div id="title" class="text-4xl">{title}</div>
			<!-- <div id="category" class="">{category}</div> -->
			<div id="price" class="text-2xl">{price} €</div>
			<div class="grid grid-cols-4">
				s
				<div id="count" class="">{rating.count}</div>
				<div id="rate" class="">{rating.rate}</div>
			</div>
		</div>
	</div>
	<div class="p-2 row-start-2 col-start-2">
		<div id="description" class="">{description}</div>
	</div>
</div>
