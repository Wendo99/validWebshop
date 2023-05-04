<script lang="ts">
	import ProductPreviewBox from './productPreviewBox.svelte';
	export let data;

	// Image Src String
	let imageSrc = './mainImg_1920x724.jpg';
</script>

<main class=" box-border pt-1 grid grid-flow-row gap-y-1">
	<div id="imageCont" class="border grid">
		<img
			src={imageSrc}
			alt="woman young blonde fashion"
			class="justify-self-center rounded-lg w-2/3"
		/>
	</div>

	<div id="productpreviewArea" class="grid grid-cols-3 justify-items-center border ">
		

		{#each data.products as p}
        <ProductPreviewBox src={p.image} id={p.id} 
        category={p.category} description={p.description}
        price= {p.price} title= {p.title} 
        rating={p.rating}/>
           
		{/each}
	</div>
</main>
