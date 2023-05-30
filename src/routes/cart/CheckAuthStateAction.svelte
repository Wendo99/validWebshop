<script lang="ts">
	export let dialog: HTMLDialogElement | null = null;


</script>

<button
	class="text-white bg-black p-2 w-40 h-20 grid grid-flow-col items-center justify-center
text-lg
rounded-md
ring-orange
hover:ring-4
hover:border"
	on:click|preventDefault={() => dialog?.showModal()}>Proceed to Checkout</button
>
<dialog class="shadow p-4 border w-72 h-32" bind:this={dialog}>
	<p>You need to be logged in to proceed to Checkout!</p>
	<form method="dialog">
		<button>isok</button>
	</form>
</dialog>
