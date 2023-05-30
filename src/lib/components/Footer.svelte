<script>
	// Text String
	let imprint = 'Imprint';
	let contact = 'Contact';
	let privacyPolicy = 'Privacy policy';

	// PageLink String
	let linkImprint = '/imprint';
	let linkContact = '/contact';
	let linkPrivacyPolicy = '/privacyPolicy';
</script>

<footer
	class="p-2 bg-black text-white h-20 grid items-center grid-flow-col gap-x-12 auto-cols-max justify-end"
>
	<a href={linkContact}>{contact}</a>
	<a href={linkPrivacyPolicy}>{privacyPolicy}</a>

	<a href={linkImprint}>{imprint}</a>
</footer>
