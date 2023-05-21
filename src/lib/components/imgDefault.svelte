<script lang="ts">
	export let src: string;
	export let alt: string;
	export let classStyle: string = '';
</script>

<img class="max-w-full h-auto {classStyle}" {src} {alt} />
