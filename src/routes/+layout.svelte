<script lang="ts">
	import '../app.css';

	// Button String
	let loginBtn = 'Login';
let accountBtn = 'Account';

	let logoSrc = './corpLogo.png';
	let corpBrandSrc = './corpBrand.png';
	let mainPageImage ;
</script>

<body class=" w-5/6 h-screen m-auto bg-baseWight">
	<header
		class="mt-2 h-1/6 box-border rounded-lg bg-slate-300 border-red-500 border grid items-center"
	>
		<div id="headEle" class="grid grid-cols-3 border-red-500 border">
			<div
				id="compEle"
				class="grid grid-cols-2 justify-items-center items-center border-red-500 border"
			>
				<img src={logoSrc} alt="corporation logo" class="w-2/3 border-red-500 border" />
				<img src={corpBrandSrc} alt="brand logo" class=" border-red-500 border" />
			</div>
			<div id="searchbar" class="border-red-500 border grid items-end">
				<input id="searchBar" type="text" />
			</div>
			<div id="accountEle" class="grid grid-cols-2 items-end justify-around gap-2">
				<button class=" bg-acOrange border text-baseWight" id="login">{loginBtn}</button>
				<button class=" bg-acBrown border text-baseWight" id="account">{accountBtn}</button>
			</div>
		</div>
	</header>
	<nav>
		<div id="prodSpec" />
		<div id="prodCart" />
		<img src="" alt="">
	</nav>
	<main>
		<slot />
	</main>
</body>
