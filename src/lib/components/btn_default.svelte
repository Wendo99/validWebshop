<script lang="ts">
	export let text: string;
	export let style: string = '';
	let buttonType = 'button';

	function changeButtonType(type: string) {
		buttonType = type;
	}
</script>

{#if buttonType === 'button'}
	<button
		class="rounded-xl p-2 min-w-min max-w-fit text-1xl font-semibold bg-slate-300 shadow-1xl drop-shadow-md hover:ring-4 hover:ring-slate-300 {style}"
		type="button">{text}</button
	>
{:else if buttonType === 'submit'}
	<button
		class="rounded-xl p-2 min-w-min max-w-fit text-1xl font-semibold bg-slate-300 shadow-1xl drop-shadow-md hover:ring-4 hover:ring-slate-300 {style}"
		type="submit">{text}</button
	>
{:else if buttonType === 'reset'}
	<button
		class="rounded-xl p-2 min-w-min max-w-fit text-1xl font-semibold bg-slate-300 shadow-1xl drop-shadow-md hover:ring-4 hover:ring-slate-300 {style}"
		type="reset">{text}</button
	>
{/if}
