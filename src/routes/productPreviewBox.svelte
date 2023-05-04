<script lang="ts">
	import type { Rating } from './+page.server';

	export let src: string;

	export let title: string = 'Boss';
	export let price: number = 12.99;
	export let rating: Rating;

	// not shown on main
	export let id;
	export let description;
	export let category: string;
</script>

<div
	id="box"
	class=" box-border overflow-auto w-1/3 h-auto p-3 rounded-lg bg-secLightBrown grid grid-rows-2"
>
	<div id="prodImage" class="border center">
		<img class="rounded-lg mb-4 border" {src} alt="jacket grey" />
	</div>
	<div id="productInfo" class="border grid grid-rows-3 grid-cols-2 gap-2">
		<div id="prodTitle" class="col-span-2"><div>{title}</div></div>
		<div id="price" class="col-span-2">{price}</div>
		<div id="rating" class="grid grid-cols-2">
			<div id="count" class="">{rating.count}</div>
			<div id="rate">{rating.rate}</div>
		</div>
	</div>
</div>
