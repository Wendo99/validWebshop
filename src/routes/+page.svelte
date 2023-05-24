<script lang="ts">
	import ProductPreviewBox from './productPreviewBox.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { hasPlayed } from '$lib/stores/main';

	export let data;

	let headlineVisibility = false;

	if ($hasPlayed === false) {
		onMount(() => {
			(headlineVisibility = true), hasPlayed.set(true);
		});
	}
	
</script>

<svelte:head><title>Donkey Store</title></svelte:head>
<main>
	<div class="relative">
		<div class="absolute">
			{#if headlineVisibility == true}
				<h1
					in:fly|once={{ x: -1000, duration: 3000 }}
					class="text-red-600 text-5xl absolute text-center w-full"
				>
					Welcome
				</h1>
			{/if}
			<ImageDefault
				classStyle="rounded-lg"
				src="/mainImg_1920x724.jpg"
				alt="woman young blonde fashion"
			/>
		</div>
		<div class="h-40" />
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
	</div>
</main>
