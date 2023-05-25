<script lang="ts">
	import RequieredStar from '$lib/types/RequieredStar.svelte';

	export let value = '';
	export let id: string;
	export let label: string;
	export let type = 'text';
	export let name: string;
	export let required = false;

	export let inputRef = null;

	function setType(node: any) {
		node.type = type;
	}
</script>

<div class={$$props.class}>
	<label for={id} class="block text-xs font-medium tracking-widest text-gray-500">
		{label}<RequieredStar />
	</label>
	<div class="mt-1">
		<input
			{...$$restProps}
			use:setType
			{name}
			{id}
			{required}
			bind:value
			bind:this={inputRef}
			class="shadow-md drop-shadow-md block w-full sm:text-sm rounded-md p-2 outline-none {$$props.class}"
		/>
	</div>
</div>
