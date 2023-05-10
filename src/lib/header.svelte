<script lang="ts">
	let loginBtn = 'Login';
	let accountBtn = 'Account';
	let cartBtn = 'Cart';
	let linkLogin = '/signIn';
	let compHeader = 'Donkey';
	export let userMail: string | undefined;
	
</script>

<header class=" p-2 grid-flow-row">
	<div class="grid grid-flow-col gap-3">
		<div class="  grid grid-flow-col justify-start content-center gap-3">
			<div class=" grid justify-center content-center">
				<a href="/"
					><img src="logo_872x872.png" width="96" height="96" alt="company logo black donkey" /></a
				>
			</div>
			<div class=" grid justify-center content-center">
				<h2 id="compHeader" class="text-5xl">{compHeader}</h2>
			</div>
		</div>
		<div class=" grid grid-cols-7 gap-3 justify-center content-center">
			<input id="searchBar" type="text" class=" rounded-xl col-start-2 col-end-6" />
			<div id="userName" />
		</div>
		<div class=" grid grid-cols-3 items-center text-1xl font-semibold justify-items-center">
			<a href={linkLogin} class="p-2">
				<button class="rounded-full border p-2 w-40 h-14" id="login">{loginBtn}</button></a
			>
			<a href="" class="p-2">
				<button class="rounded-full border p-2 w-40 h-14" id="account">{accountBtn}</button>
			</a>
			<a href="/cart" class="p-2">
				<button
					class="rounded-full border p-2 w-40 h-14 grid grid-rows-2 justify-items-center items-center"
					id="cart">{cartBtn} <img class="max-h-7 row-start-2" src="cart.svg" alt="" /></button
				>
			</a>
		</div>
	</div>
	<div class="grid grid-cols-12">
		<nav class="grid col-start-2">
			<ul class=" grid justify-end grid-flow-col">
				<li><a href="/">Home</a></li>
			</ul>
		</nav>
		<div class="grid borer col-span-4 col-start-9 justify-self-center" id="userNamePerm">
			{userMail}
		</div>
	</div>
</header>
