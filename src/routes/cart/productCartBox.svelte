<script lang="ts">
	import { getCurrencyString } from '$lib/utils/currencyUtils';

	export let src: string;
	export let title: string;
	export let price: number;
	export let qty: string;
</script>

<div class="bg-white h-24 mb-7 border-6 rounded-md p-2 shadow-md drop-shadow-lg">
	<div class="grid grid-rows-2 grid-cols-12">
		<div class="grid row-span-2 col-start-1 w-24 items-center justify-items-center">
			<img {src} alt="prodPic" class="w-16 h-auto" />
		</div>
		<div class="grid row-span-2 col-span-11">
			<div class="grid justify-center self-center text-base font-semibold">
				{title}
			</div>
			<div class=" grid justify-end content-center font-bold">
				{getCurrencyString(price)}
			</div>
			<div class="  grid justify-end content-center font-bold">
				{qty}
				{#if qty == '1'}
					piece
				{:else}
					pieces
				{/if}
			</div>
		</div>
	</div>
</div>
