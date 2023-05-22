<script lang="ts">
	import ImageDefault from '../types/ImageDefault.svelte';
	import ButtonButton from '../types/ButtonDefault.svelte';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	const itemsQty: Readable<number> = getContext('qty');
</script>

<a href="/cart" class="">
	<ButtonButton classStyle="grid grid-cols-2   items-center">
		<div class=" justify-self-start">Basket</div>
		<div class="">
			<ImageDefault
				width="80"
				height="80"
				classStyle=" justify-self-end"
				src="shoppingBasket.svg"
				alt="shopping basket"
			/>
			<div class="absolute top-6 right-6 text-base font-bold">{$itemsQty}</div>
		</div>
	</ButtonButton>
</a>
