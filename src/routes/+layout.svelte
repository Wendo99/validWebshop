<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { userBasketStore } from '$lib/stores/userBasketStore';
	import { setContext } from 'svelte';
	import { itemsQty } from '$lib/stores/itemsQty';
	import '@fontsource/pacifico/latin.css';
	import '@fontsource/arvo/latin.css';

	export let data;

	$: userBasketStore.set(data.userCart);
	$: setContext('userBasket', userBasketStore);
	$: setContext('qty', itemsQty);
</script>

<main class="bg-white">
	<Header userEmail={data.user_eMail} />

	<slot />

	<Footer />
</main>
