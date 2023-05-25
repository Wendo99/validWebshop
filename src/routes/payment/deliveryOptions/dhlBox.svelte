<script>
	import InputDefault from '$lib/types/InputDefault.svelte';
	import RequieredStar from '$lib/types/RequieredStar.svelte';
</script>

<div class="grid-flow-col auto-cols-max">
	<span class="mr-2 text-xs font-medium tracking-widest text-gray-600">DHL Number<RequieredStar /></span>
	<span>
		<InputDefault type="number" required />
	</span>
</div>
