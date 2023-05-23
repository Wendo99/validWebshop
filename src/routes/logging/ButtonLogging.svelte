<script lang="ts">
	import ButtonDefault from '$lib/types/ButtonDefault.svelte';
	export let disabled = false;
</script>

<ButtonDefault type="submit" {disabled} addClassProps="h-12">
	<slot />
</ButtonDefault>
