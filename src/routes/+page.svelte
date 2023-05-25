<script lang="ts">
	import ProductPreviewBox from './productPreviewBox.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { hasPlayed } from '$lib/stores/mainPageHeadlinePlayedStore';

	export let data;

	let headlineVisibility = false;

	if ($hasPlayed === false) {
		onMount(() => {
			(headlineVisibility = true), hasPlayed.set(true);
		});
	}
</script>

<svelte:head><title>Donkey Store &#8226; Where the wild things are</title></svelte:head>

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
	<div class="h-24" />
	<div id="productpreviewArea" class="grid grid-cols-4 justify-items-center">
		{#each data.productArr_All as p}
			<ProductPreviewBox
				src={p.image}
				id={p.id}
				price={p.price}
				title={p.title}
				count={p.count}
				rate={p.rate}
			/>
		{/each}
	</div>
</main>
