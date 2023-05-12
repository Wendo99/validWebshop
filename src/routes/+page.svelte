<script lang="ts">
	import ProductPreviewBox from './productPreviewBox.svelte';
	export let data;

	// Image Src String
	let imageSrc = './mainImg_1920x724.jpg';
</script>

<svelte:head><title>Donkey Fashion</title></svelte:head>

<div class="relative">

	<div class="absolute">
		<img
			src={imageSrc}
			alt="woman young blonde fashion"
			class=""
		/>
	</div>
	<div class="h-96"></div>
	<div
		id="productpreviewArea"
		class="grid grid-cols-4  justify-items-center"
	>
		{#each data.products as p}
			<ProductPreviewBox
				src={p.image}
				id={p.id}
				category={p.category}
				description={p.description}
				price={p.price}
				title={p.title}
				rating={p.rating}
			/>
		{/each}
	</div>
</div>
