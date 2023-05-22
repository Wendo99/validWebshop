<script lang="ts">
	import ButtonDefault from './ButtonDefault.svelte';
	// export let classStyle: string = '';
	export let buttonType: string = 'submit';
</script>

<ButtonDefault type={buttonType}>
	<slot />
</ButtonDefault>
