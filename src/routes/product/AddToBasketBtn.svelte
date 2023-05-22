<script lang="ts">
	import BtnDefault from '$lib/components/btn_default.svelte';
	import ImgDefault from '$lib/components/imgDefault.svelte';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	let addToBasketBtn: BtnDefault;
	let userBasketStore: Writable<Map<string, string>> = getContext('userBasket');
	
	onMount(() => {
		addToBasketBtn.changeButtonType('submit');
	});
	
	export let id: number = 0;
	let prodqty: string | undefined = '';
	$: if ($userBasketStore.has(id.toString())) {
		prodqty = $userBasketStore.get(id.toString());
	} else {
		prodqty = '';
	}
</script>

<BtnDefault bind:this={addToBasketBtn} style="items-center"
	><div class="text-1xl">Add to Basket</div>
	<div>
		<ImgDefault src="/shoppingBag.svg" alt="shopping" width="80" height="80" />
		<div class="text-base font-bold absolute top-10 right-7">{prodqty}</div>
	</div>
</BtnDefault>
