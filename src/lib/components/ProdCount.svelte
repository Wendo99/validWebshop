<script lang="ts">
	import ImageDefault from '$lib/types/ImageDefault.svelte';

	export let count: number;
</script>

<div class="grid grid-cols-2 items-center gap-1">
	<ImageDefault
		width="20"
		height="20"
		{...$$restProps}
		src="/userGroup.svg"
		alt="user rating counter"
	/>
	<div>{count}</div>
</div>
