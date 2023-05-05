<script lang="ts">
	import '../app.css';
	import Header from '../lib/header.svelte';
	import Footer from '../lib/footer.svelte';

	// Image src
</script>

<div class="p-2 font-sans-auto bg-white min-h-full min-w-full border">

	<Header />


	<slot />

	<Footer />

</div>
