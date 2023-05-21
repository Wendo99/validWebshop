<script lang="ts">
	export let text: string;
	export let disabled: boolean = false;
</script>

<button
	class="rounded-lg px-4 py-2 min-w-min max-w-fit text-lg   bg-blue-200 shadow-2xl drop-shadow-lg hover:ring-4 hover:ring-blue-200 active:bg-blue-200 active:ring-blue-300"
	type="submit"
	{disabled}
	>{text}
</button>
