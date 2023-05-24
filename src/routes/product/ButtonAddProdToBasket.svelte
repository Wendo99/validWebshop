<script lang="ts">
	import ButtonDefault from '$lib/types/ButtonDefault.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let userBasketStore: Writable<Map<string, string>> = getContext('userBasket');

	export let id: number = 0;

	let qty: string | undefined = '';
	let qtyNumberLenght: number;
	let offsetQty: string = 'right-10';

	$: if ($userBasketStore.has(id.toString())) {
		qty = $userBasketStore.get(id.toString());
		if (qty != undefined) {
			qtyNumberLenght = qty.length;
			if (qtyNumberLenght == 2) {
				offsetQty = 'right-9';
			} else if (qtyNumberLenght == 3) {
				offsetQty = 'right-8';
			}
		}
	} else {
		qty = '0';
	}

</script>

<ButtonDefault type="submit" class="items-center {$$restProps.class}"
	><div>Add</div>
	<div>
		<ImageDefault src="/shoppingBag.svg" alt="shopping" width="50" height="50" />

			<div class="text-base font-bold absolute top-7 {offsetQty}">
				{qty}
			</div>

	</div>
</ButtonDefault>
