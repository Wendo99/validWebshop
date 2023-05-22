<script lang="ts">
	export let value = '';
	export let id : string;
	export let label : string;
	export let type = 'text';
	export let name : string;
	export let required = false;

	export let inputRef = null;

	function setType(node:any) {
		node.type = type;
	}
</script>

<div class={$$props.class}>
	<label for={id} class="block text-sm font-medium text-gray-700">
		{label}
	</label>
	<div class="mt-1">
		<input
			use:setType
			{name}
			{id}
			{required}
			bind:value
			bind:this={inputRef}
			class="shadow-1xl drop-shadow-lg block w-full sm:text-sm rounded-md p-2 outline-none bg-blue-50"
		/>
	</div>
</div>