<script lang="ts">
	import '../app.css';

	// Text String
	let loginBtn = 'Login';
	let accountBtn = 'Account';
	let imprint = 'Imprint';
	let contact = 'Contact';
	let cartBtn = 'Cart';

	// PageLink String
	let linkImprint = './imprint.svelte';
	let linkContact = './contact.svelte';

	// Image src
	let logoSrc = './logo_872x872.png';
	let compHeader = 'Donkey';
</script>

<body class="box-border p-0 m-0 break-words bg-baseWhite font-serif ">
	<div id="overAll" class="grid grid-flow-row ">
		<header class=" p-2 grid-flow-row ">
			<div class="grid grid-flow-col gap-3">
				<div class="  grid grid-flow-col justify-start content-center gap-3">
					<div class=" grid justify-center content-center">
						<a href="/"><img src={logoSrc} width="96" height="96" alt="corporation logo" /></a>
					</div>
					<div class=" grid justify-center content-center">
						<h2 id="compHeader" class="text-5xl">{compHeader}</h2>
					</div>
				</div>
				<div class=" grid grid-cols-7 gap-3 justify-center content-center">
					<input id="searchBar" type="text" class=" rounded-xl col-start-2 col-end-6" />
				</div>
				<div class=" grid grid-cols-7 gap-3 content-center">
					<button class="rounded-full border p-2 col-start-2" id="login">{loginBtn}</button>
					<button class="rounded-full border p-2 col-start-3" id="account">{accountBtn}</button>
					<button class="rounded-full border p-2 col-start-6" id="cart">{cartBtn}</button>
				</div>
			</div>
			<div class="grid grid-cols-12 ">
				<nav class="grid col-start-2 ">
					<ul class=" grid justify-end grid-flow-col">
						<li><a href="/">Home</a></li>
					
					</ul>
				</nav>
			</div>
		</header>

		<main id="content" class="grid grid-flow-col">
			<div>
				<slot />
			</div>
		</main>

		<footer
			class="bg-baseblack  grid-cols-none justify-start w-full p-2 rounded-lg "
		>
			<div id="imprintLink" class="text-baseWhite inline-block mr-5">
				<a href={linkImprint}>{imprint}</a>
			</div>
			<div id="contactLink" class="text-baseWhite inline-block">
				<a href={linkContact}>{contact}</a>
			</div>
		</footer>
	</div>
</body>
