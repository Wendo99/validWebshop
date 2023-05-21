<script lang="ts">
	import '../app.css';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
	export let data;
</script>

<div class="p-2 font-sans bg-baseWhite">
	<Header user_eMail={data.user_eMail} />

	<slot />

	<Footer />
</div>
