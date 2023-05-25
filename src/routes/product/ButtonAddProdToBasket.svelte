<script lang="ts">
	import ButtonDefault from '$lib/types/ButtonDefault.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let userBasketStore: Writable<Map<string, string>> = getContext('userBasket');

	export let id: number = 0;

	let qty: string | undefined = '';
	let qtyNumberLenght: number;
	let offsetQty: string = '';

	$: if ($userBasketStore.has(id.toString())) {
		qty = $userBasketStore.get(id.toString());
		if (qty != undefined) {
			qtyNumberLenght = qty.length;
			if (qtyNumberLenght == 2) {
				offsetQty = '';
			} else if (qtyNumberLenght == 3) {
				offsetQty = '';
			}
		}
	} else {
		qty = '0';
	}
</script>

<ButtonDefault
	type="submit"
	class="items-center relative bg-black text-white hover:ring-4 {$$restProps.class}"
	><div>Add</div>
	<div>
		<ImageDefault src="/shoppingBag.svg" alt="shopping" width="50" height="50" />

		<div class="text-base font-bold absolute top-9 text-orange  end-14 {offsetQty}">
			{qty}
		</div>
	</div>
</ButtonDefault>
