<script lang="ts">
	import ImageDefault from '$lib/types/ImageDefault.svelte';

	export let rate: number;
</script>

<div class="grid grid-cols-2 items-center">
	<ImageDefault width="30" height="30" {...$$restProps} src="/star.svg" alt="star rating" />

	<div>{rate}</div>
</div>
