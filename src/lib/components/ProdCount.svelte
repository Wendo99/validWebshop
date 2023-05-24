<script lang="ts">
	import ImageDefault from '$lib/types/ImageDefault.svelte';

	export let count: number;
</script>

<div class="grid grid-cols-2 items-center">
	<ImageDefault
		width="30"
		height="30"
		{...$$restProps}
		src="/userGroup.svg"
		alt="user rating counter"
	/>
	<div>{count}</div>
</div>
