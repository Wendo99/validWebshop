<script lang="ts">
	import ButtonDefault from '$lib/types/ButtonDefault.svelte';

	export let buttonType: string = 'button';
	export let disabled = false;
</script>

<ButtonDefault type={buttonType} {disabled} class="">
	<slot />
</ButtonDefault>
