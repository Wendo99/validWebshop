<script lang="ts">
	import ButtonDefault from '$lib/types/ButtonDefault.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	let userBasketStore: Writable<Map<string, string>> = getContext('userBasket');

	export let id: number = 0;

	let prodqty: string | undefined = '';

	$: if ($userBasketStore.has(id.toString())) {
		prodqty = $userBasketStore.get(id.toString());
	} else {
		prodqty = '';
	}
</script>

<ButtonDefault type="submit"
	><div class="text-1xl">Add to Basket</div>
	<div>
		<ImageDefault src="/shoppingBag.svg" alt="shopping" width="80" height="80" />
		<div class="text-base font-bold absolute top-10 right-7">{prodqty}</div>
	</div>
</ButtonDefault>
