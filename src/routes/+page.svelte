<script lang="ts">
	import ProductPreviewBox from './productPreviewBox.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	export let data;
</script>

<svelte:head><title>Donkey Fashion</title></svelte:head>

<div class="relative">
	<div class="absolute">
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
