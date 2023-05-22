<script>
	// Text String
	let imprint = 'Imprint';
	let contact = 'Contact';

	// PageLink String
	let linkImprint = '/imprint';
	let linkContact = '/contact';
</script>

<footer class="rounded-lg m-2">
	<div id="imprintLink" class=" inline-block mr-5">
		<a href={linkImprint}>{imprint}</a>
	</div>
	<div id="contactLink" class=" inline-block">
		<a href={linkContact}>{contact}</a>
	</div>
</footer>
