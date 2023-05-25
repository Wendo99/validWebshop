<script lang="ts">
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	import ProdCount from '$lib/components/ProdCount.svelte';
	import ProdRate from '$lib/components/ProdRate.svelte';
	import { getCurrencyString } from '$lib/utils/currencyUtils';

	export let src: string;
	export let title: string;
	export let price: number;
	export let count: number;
	export let rate: number;
	export let id: number;
</script>

<a href="/product/{id}">
	<div
		class="text-black grid grid-flow-row justify-items-center items-center border-6 max-h-fit w-64 h-96 p-3 rounded-md bg-white shadow-md drop-shadow-md mb-16 hover:drop-shadow-2xl hover:shadow-2xl "
	>
		<div
			class="bg-opacity-100 bg-white rounded-md grid items-center justify-items-center w-48 h-48"
		>
			<div class="grid items-center justify-items-center">
				<ImageDefault {src} width="110" height="110" alt="product" />
			</div>
		</div>

		<div class="grid font-semibold text-center">{title}</div>

		<div class="font-bold">{getCurrencyString(price)}</div>

		<div class="grid grid-flow-col auto-cols-fr gap-x-2 scale-75">
			<ProdCount {count} />
			<ProdRate {rate} />
		</div>
	</div></a
>
