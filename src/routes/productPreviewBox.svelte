<script lang="ts">
	import ImgDefault from '$lib/components/imgDefault.svelte';
	import Prod_Count from '../lib/components/prod_Count.svelte';
	import Prod_Star from '../lib/components/prod_Rate.svelte';

	export let src: string;
	export let title: string;
	export let price: number;
	export let count: number;
	export let rate: number;
	export let id: number;
</script>

<a href="/product/{id}">
	<div
		id="box"
		class=" border-6 max-h-fit w-64 h-96 p-2 rounded-xl bg-baseWhite shadow-2xl drop-shadow-md grid grid-row-2 gap-2 mb-16 bg-opacity-50 hover:ring-2 hover:ring-gray-50"
	>
		<div id="prodImage" class="grid justify-center content-center">
			<ImgDefault classStyle="w-2/3 max-h-60" {src} alt="jacket grey" />
		</div>
		<div id="productInfo" class=" grid grid-flow-row gap-3 text-base border-black">
			<div id="prodTitle" aria-hidden="true" class="font-medium text-gray-700">{title}</div>
			<div class="grid grid-cols-2 grid-rows-1 items-center">
				<div class="grid grid-cols-2">
					<div id="price" class="text-gray-900 font-bold">{'€ ' + price}</div>
					<div id="rating" class="grid grid-flow-col auto-cols-max gap-1">
						<Prod_Count {count} />
						<Prod_Star {rate} />
					</div>
				</div>
			</div>
		</div>
	</div></a
>
