<script lang="ts">
	import type { Rating } from '../routes/+page.server';

	// import Rating from './rating.svelte';
	import Count from './userRatingCounter.svelte';
	import StarRating from './starRating.svelte';

	export let src: string;

	export let title: string = 'Boss';
	export let price: number = 12.99;
	export let rating: Rating;

	// not shown on main
	export let id: number;
	export let description;
	export let category: string;

	let userSvg = 'userGroup.svg';
</script>

<a href="/product/{id}">
	<div
		id="box"
		class="border-1 border-gray-100 max-h-fit w-64 h-96 box-border p-3 rounded-lg bg-white shadow-2xl drop-shadow-md grid grid-row-2 gap-2 mb-16 opacity-90 hover:ring-2 hover:ring-gray-50"
	>
		<div id="prodImage" class="grid justify-center content-center">
			<img
				class=" max-w-full h-auto max-h-48 rounded-lg hover:opacity-50"
				{src}
				alt="jacket grey"
			/>
		</div>
		<div id="productInfo" class=" grid grid-flow-row gap-3 text-base border-black">
			<div id="prodTitle" aria-hidden="true" class="font-medium text-gray-700">{title}</div>
			<div class="grid grid-cols-2 grid-rows-1 items-center">
				<div class="grid grid-cols-2">
					<div id="price" class="text-gray-900 font-bold">{'€ ' + price}</div>
					<div id="rating" class="grid grid-flow-col justif items-center gap-1">
						<Count {rating} />
						<StarRating {rating} />
					</div>
				</div>
			</div>
		</div>
	</div></a
>
