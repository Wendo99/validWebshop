<script lang="ts">
	export let type: string = 'text';
	export let style: string;
</script>

<input type={type} class="rounded-xl h-8 {style} p-2" />
