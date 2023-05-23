<script lang="ts">
	import ImageDefault from '../types/ImageDefault.svelte';
	import ButtonButton from '../types/ButtonDefault.svelte';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	const itemsQty: Readable<number> = getContext('qty');
</script>

<a href="/cart">
	<ButtonButton class="items-center">
		<div>Basket</div>
		<div>
			<ImageDefault
				width="50"
				height="50"
				src="/shoppingBasket.svg"
				alt="shopping basket"
			/>
			<!-- TODO adjust the right-Pos value to center the num even with 2 or 3 digits  -->
			<div class="absolute top-4 right-8 text-base font-bold">{$itemsQty}</div>
		</div>
	</ButtonButton>
</a>
