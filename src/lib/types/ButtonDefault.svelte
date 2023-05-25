<script lang="ts">
</script>

<button
	{...$$restProps}
	class="content-center justify-between font-medium w-40 h-16 grid grid-flow-col bg-blue-100 rounded-lg p-2 text-xl shadow-2xl drop-shadow-lg hover:ring-4 hover:ring-blue-100 active:bg-blue-200 active:ring-blue-300 {$$restProps.class}"
	><slot /></button
>
