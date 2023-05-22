<script lang="ts">
	export let count: number;
	const src = '/userGroup.svg'
</script>

<div class="grid grid-cols-2 gap-x-1 items-center">
	<img {src} alt="user rating counter" />
	<div>{count}</div>
</div>
