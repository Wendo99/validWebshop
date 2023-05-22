<script lang="ts">
	import ImgDefault from '$lib/components/imgDefault.svelte';
	import ProdCount from '$lib/components/ProdCount.svelte';
	import ProdRate from '../lib/components/ProdRate.svelte';

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
		class="grid grid-flow-row justify-items-center items-center border-6 max-h-fit w-64 h-96 p-3 rounded-xl bg-white shadow-2xl drop-shadow-xl mb-16 bg-opacity-60 hover:ring-2 hover:ring-gray-50"
	>
		<div
			class="bg-opacity-100 bg-white rounded-xl grid items-center justify-items-center w-48 h-48"
		>
			<div id="prodImage" class="grid items-center justify-items-center">
				<ImgDefault classStyle=" max-w-48 max-h-48" {src} alt="product" />
			</div>
		</div>

		<div id="prodTitle" class="grid font-semibold text-center">{title}</div>

		<div id="price" class="font-extrabold">{'€ ' + price}</div>

		<div id="rating" class="grid grid-flow-col auto-cols-fr gap-x-2 scale-75">
			<ProdCount {count} />
			<ProdRate {rate} />
		</div>
	</div></a
>
