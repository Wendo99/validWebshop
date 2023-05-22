<script lang="ts">
	import ButtonDefault from './ButtonDefault.svelte';
	export let classStyle: string = '';
	export let buttonType: string = 'button';
</script>

<ButtonDefault type={buttonType}>
	<slot />
</ButtonDefault>
