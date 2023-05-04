<script lang="ts">
	import ProductPreviewBox from './productPreviewBox.svelte';
	export let data;

	// Image Src String
	let imageSrc = './mainImg_1920x724.jpg';
</script>

<div class=" ">
	<div id="imageCont" class="p-2">
		<img
			src={imageSrc}
			alt="woman young blonde fashion"
			class="justify-self-center rounded-lg"
		/>
	</div>

	<div id="productpreviewArea" class="grid grid-cols-4 justify-items-center  p-2">
		

		{#each data.products as p}
        <ProductPreviewBox src={p.image} id={p.id} 
        category={p.category} description={p.description}
        price= {p.price} title= {p.title} 
        rating={p.rating}/>
           
		{/each}
	</div>
</div>
