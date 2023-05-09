<script>
	let loginBtn = 'Login';
	let accountBtn = 'Account';
	let cartBtn = 'Cart';

	let linkLogin = '/login';

	let compHeader = 'Donkey';
</script>

<header class=" p-2 grid-flow-row">
	<div class="grid grid-flow-col gap-3">
		<div class="  grid grid-flow-col justify-start content-center gap-3">
			<div class=" grid justify-center content-center">
				<a href="/"><img src="logo_872x872.png" width="96" height="96" /></a>
			</div>
			<div class=" grid justify-center content-center">
				<h2 id="compHeader" class="text-5xl">{compHeader}</h2>
			</div>
		</div>
		<div class=" grid grid-cols-7 gap-3 justify-center content-center">
			<input id="searchBar" type="text" class=" rounded-xl col-start-2 col-end-6" />
		</div>
		<div class=" grid grid-cols-7 gap-3 content-center">
			<a href={linkLogin}> <button class="rounded-full border p-2 col-start-2" id="login">{loginBtn}</button></a>
			<button class="rounded-full border p-2 col-start-3" id="account">{accountBtn}</button>
			<button class="rounded-full border p-2 col-start-6" id="cart">{cartBtn}</button>
		</div>
	</div>
	<div class="grid grid-cols-12">
		<nav class="grid col-start-2">
			<ul class=" grid justify-end grid-flow-col">
				<li><a href="/">Home</a></li>
			</ul>
		</nav>
	</div>
</header>
