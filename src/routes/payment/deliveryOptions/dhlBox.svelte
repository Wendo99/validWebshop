<script>
	import InputDefault from '$lib/types/InputDefault.svelte';
	import RequieredStar from '$lib/types/RequieredStar.svelte';
</script>

<div class=" gap-x-4 grid-flow-col auto-cols-max">
	<span>DHL Number<RequieredStar /></span>
	<span>
		<InputDefault type="number" required />
	</span>
</div>
