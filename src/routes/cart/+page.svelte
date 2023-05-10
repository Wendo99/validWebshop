<script lang="ts">
	import ProductPreviewBox from '$lib/productPreviewBox.svelte';

	export let data;

</script>

<div class="min-h-screen" />
<div />

<div>
	{#each data.productArray as p}
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
