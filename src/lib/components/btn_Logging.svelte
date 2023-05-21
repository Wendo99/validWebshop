<script lang="ts">
	export let type;
	export let disabled = false;
</script>

<button
	{disabled}
	type="submit"
	class="{disabled == true
		? 'bg-indigo-200 hover:bg-grey-700'
		: 'bg-blue-100 rounded-lg p-2 text-lg  shadow-2xl drop-shadow-lg hover:ring-4 hover:ring-blue-100 active:bg-blue-200 active:ring-blue-300'} items-center px-4 py-2"
>
	<slot />
</button>
