<script lang="ts">
	export let addClassProps = '';
</script>

<input
	type="text"
	class="h-8 p-2 shadow-1xl drop-shadow-lg sm:text-sm rounded-md {addClassProps}"
	{...$$restProps}
/>
