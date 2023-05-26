<script lang="ts">
	import ImageDefault from '../types/ImageDefault.svelte';
	import ButtonButton from '../types/ButtonDefault.svelte';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	const itemsQty: Readable<number> = getContext('qty');

	let qty: string | undefined = '';
	let qtyNumberLenght: number;
	let offsetQty: string = 'right-10';

	$: if ($itemsQty != undefined) {
		qty = $itemsQty.toString();
		qtyNumberLenght = qty.length;
		if (qtyNumberLenght == 2) {
			offsetQty = 'right-9';
		} else if (qtyNumberLenght == 3) {
			offsetQty = 'right-8';
		}
	} else {
		qty = '0';
	}
	
</script>

<a href="/cart">
	<ButtonButton class="relative">
		<div>Basket</div>
		<div>
			<ImageDefault width="60" height="60" src="/shoppingBasket.svg" alt="shopping basket" />
			<!-- TODO adjust the right-Pos value to center the num even with 2 or 3 digits  -->
			<div class="absolute text-base font-bold top-6 text-orange {offsetQty}">{$itemsQty}</div>
		</div>
	</ButtonButton>
</a>
