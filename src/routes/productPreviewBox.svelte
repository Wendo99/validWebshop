<script lang="ts">
	import type { Rating } from './+page.server';

	export let src: string;

	export let title: string = 'Boss';
	export let price: number = 12.99;
	export let rating: Rating;

	// not shown on main
	export let id:number;
	export let description;
	export let category: string;
</script>

<a href="/product/{id}">
			<div
			id="box"
			class="w-72 h-96 box-border p-2 rounded-lg bg-secLightBrown grid grid-flow-row gap-3 mb-16 opacity-90"
			>
			<div id="prodImage" class=" grid justify-center content-center">
				<img class="rounded-lg" width="128" height="64" {src} alt="jacket grey" />
			</div>
			<div id="productInfo" class=" grid grid-flow-row gap-3">
				<div id="prodTitle" class="">{title}</div>
				<div class="grid grid-cols-2">
					<div id="price" class="">{price + ' €'}</div>
					<div id="rating" class="grid grid-flow-col">
						<div id="count" class="">{rating.count}</div>
						<div id="rate">{rating.rate}</div>
					</div>
				</div>
			</div>
		</div>
	</a>