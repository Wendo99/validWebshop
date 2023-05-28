<script>
	// Text String
	let Imprint = 'Imprint';
	let contact = 'Contact';

	// PageLink String
	let linkImprint = '/imprint';
	let linkContact = '/contact';
</script>

<footer class="p-2 bg-black text-white h-20 grid items-center grid-flow-col gap-x-12 auto-cols-max">
	<div id="imprintLink">
		<a href={linkImprint}>{Imprint}</a>
	</div>
	<div id="contactLink">
		<a href={linkContact}>{contact}</a>
	</div>
</footer>
