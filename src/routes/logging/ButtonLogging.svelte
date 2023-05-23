<script lang="ts">
	import ButtonDefault from '$lib/types/ButtonDefault.svelte';
	export let disabled = false;
</script>

<ButtonDefault type="submit" {disabled} class="h-12">
	<slot />
</ButtonDefault>
