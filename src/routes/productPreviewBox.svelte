<script lang="ts">
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	import ProdCount from '$lib/components/ProdCount.svelte';
	import ProdRate from '$lib/components/ProdRate.svelte';

	export let src: string;
	export let title: string;
	export let price: number;
	export let count: number;
	export let rate: number;
	export let id: number;
</script>

<a href="/product/{id}">
	<div
		class="grid grid-flow-row justify-items-center items-center border-6 max-h-fit w-64 h-96 p-3 rounded-xl bg-white shadow-2xl drop-shadow-xl mb-16 bg-opacity-60 hover:ring-2 hover:ring-gray-50"
	>
		<div
			class="bg-opacity-100 bg-white rounded-xl grid items-center justify-items-center w-48 h-48"
		>
			<div class="grid items-center justify-items-center">
				<ImageDefault {src} width="110" height="110" alt="product" />
			</div>
		</div>

		<div class="grid font-semibold text-center">{title}</div>

		<div class="font-bold">{'€ ' + price}</div>

		<div class="grid grid-flow-col auto-cols-fr gap-x-2 scale-75">
			<ProdCount {count} />
			<ProdRate {rate} />
		</div>
	</div></a
>
