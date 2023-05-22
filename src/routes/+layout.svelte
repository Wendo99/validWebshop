<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { userBasketStore } from '../store/userBasketStore';
	import { setContext } from 'svelte';
	import { itemsQty } from '../store/itemsQty';
	export let data;

	$: userBasketStore.set(data.userCart);
	$: setContext('userBasket', userBasketStore);
	$: setContext('qty', itemsQty);
</script>

<div class="p-2 font-sans bg-baseWhite">
	<Header user_eMail={data.user_eMail} />

	<slot />

	<Footer />
</div>
