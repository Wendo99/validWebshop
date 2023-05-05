<script>
    	// Text String
	let imprint = 'Imprint';
	let contact = 'Contact';

	// PageLink String
	let linkImprint = './imprint.svelte';
	let linkContact = './contact.svelte';
</script>

<footer class="p-2 rounded-lg bottom-0">
    <div id="imprintLink" class="text-baseWhite inline-block mr-5">
        <a href={linkImprint}>{imprint}</a>
    </div>
    <div id="contactLink" class="text-baseWhite inline-block">
        <a href={linkContact}>{contact}</a>
    </div>
</footer>