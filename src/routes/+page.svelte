<script lang="ts">
	import ProductPreviewBox from './productPreviewBox.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { hasPlayed } from '$lib/stores/headlinePlayedStore';

	export let data;

	let headlineVisibility = false;

	onMount(() => {
		if ($hasPlayed === false) {
			(headlineVisibility = true), hasPlayed.set(true);
		}
	});
</script>

<svelte:head><title>Juvenile &#8226; Welcome and enjoy!</title></svelte:head>

<main class="">
	<div class="p-2">
		{#if headlineVisibility == true}
			<h1
				in:fly|once={{ x: -1000, duration: 1500 }}
				class="absolute right-0 text-orange text-6xl top-2/3 text-center w-screen font-headline"
				on:introend={() => {
					headlineVisibility = false;
				}}
				out:fade={{ delay: 2000, duration: 1500 }}
			>
				Welcome please spend a lot of money !
			</h1>
		{/if}
		<ImageDefault class="rounded-md" src="/mainImg_1920x724.jpg" alt="woman young blonde fashion" />
	</div>

	<div id="productpreviewArea" class="grid grid-cols-4 justify-items-center pt-24">
		{#each data.productArr_All as p}
			<ProductPreviewBox product={p} />
		{/each}
	</div>
</main>
