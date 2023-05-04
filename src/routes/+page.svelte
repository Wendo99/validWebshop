<script lang="ts">
	import ProductPreviewBox from './productPreviewBox.svelte';
	export let data;

	// Image Src String
	let imageSrc = './mainImg_1920x724.jpg';
</script>

<div id="imageCont" class="relative">
	<div class="">
		<img src={imageSrc} alt="woman young blonde fashion" class="p-2 rounded-3xl absolute top-0 left-0" />
	</div>
	<div id="productpreviewArea" class="relative grid grid-cols-4 justify-items-center p-2 top-96 gap-3">
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
