<script lang="ts">
	import '../app.css';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
	export let data;
	

</script>

<div class="p-2 font-sans-auto bg-slate-100 min-h-full min-w-full border">

	<Header userMail={data.userMail} />
	
	<slot />

	<Footer />
</div>
