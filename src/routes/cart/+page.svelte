<script lang="ts">
	import ProductCartBox from '../../lib/productCartBox.svelte';
	export let data;
</script>

<div class="min-h-screen">
	<div class="">
		{#each data.productArray as p}
			<ProductCartBox src={p.image} title={p.title} price={p.price} qty={data.userCart[p.id - 1]} />
		{/each}
	</div>
</div>
