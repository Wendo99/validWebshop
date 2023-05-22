<script lang="ts">
	export let type: any = 'button';
</script>

<button
	class="w-36 h-20 grid grid-cols-2 bg-blue-100 rounded-lg px-2 py-2 text-xl shadow-2xl drop-shadow-lg hover:ring-4 hover:ring-blue-100 active:bg-blue-200 active:ring-blue-300 {$$props.class}"
	{type}
	{...$$restProps}><slot /></button
>
