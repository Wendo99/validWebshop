<script lang="ts">
</script>

<button
	{...$$restProps}
	on:click
	class="text-white bg-black p-2 w-40 h-20 grid grid-flow-col items-center justify-center
	text-lg
	rounded-md
	ring-orange
	hover:ring-4
	hover:border
		 {$$restProps.class}"><slot /></button
>
