<script lang="ts">
	import '../app.css';

	// Text String
	let loginBtn = 'Login';
	let accountBtn = 'Account';
	let imprint = 'Imprint';
	let contact = 'Contact';

	// PageLink String
	let linkImprint = './imprint.svelte';
	let linkContact = './contact.svelte';

	// Image src
	let logoSrc = './corpLogo.png';
	let corpBrandSrc = './corpBrand.png';
</script>

<div class="box-border grid grid-flow-col mt-1">
	<nav id="nav" class="border left-0 absolute">
		<ul>
			<li>Home</li>
			<li>Run</li>
			<li>in</li>
			<li>Michigan</li>
		</ul>
	</nav>

	<body class="w-11/12 m-auto bg-baseWight relative grid grid-flow-row">
		<header class="p-1 grid items-center border">
			<div id="headEle" class="grid grid-cols-3">
				<div id="compEle" class="grid grid-cols-4">
					<img src={logoSrc} alt="corporation logo" class="w-1/3 self-center" />
					<img src={corpBrandSrc} alt="brand logo" class="w-1/3 self-center col-span-3" />
				</div>
				<input
					id="searchBar"
					type="text"
					class="border rounded-xl w-2/3 justify-self-center justify-around self-center"
				/>

				<div id="accountEle" class="grid grid-cols-4 justify-items-end content-center gap-1">
					<button class=" bg-acBrown text-baseWight rounded-xl w-fit col-start-3 p-1" id="login"
						>{loginBtn}</button
					>
					<button class=" bg-acBrown text-baseWight rounded-xl w-fit p-1" id="account"
						>{accountBtn}</button
					>
				</div>
			</div>
		</header>
		<slot />
		<footer
			class="absolute clear-both bottom-0 bg-baseblack border grid-cols-none justify-start w-full p-1 mb-1 rounded-lg"
		>
			<div id="imprintLink" class="text-baseWhite inline-block mr-5">
				<a href={linkImprint}>{imprint}</a>
			</div>
			<div id="contactLink" class="text-baseWhite inline-block">
				<a href={linkContact}>{contact}</a>
			</div>
		</footer>
	</body>
</div>
