<script lang="ts">
	import { Modal, bind } from 'svelte-simple-modal';
	import { writable } from 'svelte/store';
	import Popup from '$lib/types/Popup.svelte';

	const modal = writable(null);
	// @ts-ignore
	const showModal = () => modal.set(bind(Popup, { message: 'Surprise' }));
</script>

<Modal show={$modal}>
	{#if showModal() === undefined}
		{''}
	{:else}
		{showModal()}
	{/if}
</Modal>
