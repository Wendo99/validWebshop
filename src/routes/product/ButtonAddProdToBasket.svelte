<script lang="ts">
	import ButtonDefault from '$lib/types/ButtonDefault.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let userBasketStore: Writable<Map<string, string>> = getContext('userBasket');

	export let id: number = 0;

	let prodqty: string | undefined = '';

	$: if ($userBasketStore.has(id.toString())) {
		prodqty = $userBasketStore.get(id.toString());
	} else {
		prodqty = '0';
	}
</script>

<ButtonDefault {...$$restProps} type="submit" class="items-center {$$restProps.class}"
	><div>Add to Basket</div>
	<div>
		<ImageDefault src="/shoppingBag.svg" alt="shopping" width="80" height="80" />
		<div class="text-base font-bold absolute top-7 right-4">{prodqty}</div>
	</div>
</ButtonDefault>
