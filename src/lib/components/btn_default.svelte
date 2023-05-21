<script lang="ts">
	export let style: string = '';
	let buttonType = 'button';

	export function changeButtonType(type: string) {
		buttonType = type;
	}
</script>

{#if buttonType === 'button'}
	<button
		class="bg-blue-100 rounded-lg px-4 py-2 text-lg shadow-2xl drop-shadow-lg hover:ring-4 hover:ring-blue-100 active:bg-blue-200 active:ring-blue-300 {style}"
		type="button"><slot /></button
	>
{:else if buttonType === 'submit'}
	<button
		class="bg-blue-100 rounded-lg px-4 py-2 text-lg shadow-2xl drop-shadow-md hover:ring-4 hover:ring-blue-100 active:bg-blue-200 active:ring-blue-300{style}"
		type="submit"><slot /></button
	>
{:else if buttonType === 'reset'}
	<button
		class="bg-blue-100 rounded-lg px-4 py-2 text-lg shadow-2xl drop-shadow-md hover:ring-4 hover:ring-blue-100 active:bg-blue-200 active:ring-blue-300{style}"
		type="reset"><slot /></button
	>
{/if}
