<script lang="ts">
	let loginBtn = 'Login';
	let accountBtn = 'Account';
	let cartBtn = 'Cart';
	let linkLogin = '/signIn';
	let compHeader = 'Donkey';
	export let userMail: string | undefined;
</script>

<header class=" p-2 grid-flow-row">
	<div class="grid grid-flow-col">
		<div class="  grid grid-flow-col justify-start content-center gap-3">
			<div class=" grid grid-rows-2 justify-items-center items-center">
				<a href="/"
					><img src="logo_872x872.png" width="96" height="96" alt="company logo black donkey" /></a
				>
			</div>
			<div class=" grid grid-rows-2 justify-items-center items-center">
				<h2 id="compHeader" class="text-5xl">{compHeader}</h2>
			</div>
		</div>
		<div class=" grid grid-rows-2 justify-items-center items-center">
			<input id="searchBar" type="text" class=" rounded-xl h-8" />
			<div id="userName" />
		</div>
		<div class=" grid grid-cols-3 items-center text-1xl font-semibold justify-items-center">
			<div class="grid grid-rows-2">
				<a href={linkLogin} class="p-2">
					<button class="rounded-full border p-2 w-40 h-14" id="login">{loginBtn}</button>
				</a>
				<div class="grid items-center justify-items-center">
					{#if userMail == undefined}
						{''}
					{:else}
						{userMail}
					{/if}
				</div>
			</div>
			<div class="grid grid-rows-2">
				<a href="" class="p-2">
					<button class="rounded-full border p-2 w-40 h-14" id="account">{accountBtn}</button>
				</a>
			</div>
			<div class="grid grid-rows-2">
				<a href="/cart" class="p-2">
					<button
						class="rounded-full border p-2 w-40 h-14 grid grid-rows-2 justify-items-center items-center"
						id="cart">{cartBtn} <img class="max-h-7 row-start-2" src="cart.svg" alt="" /></button
					>
				</a>
			</div>
		</div>
	</div>
</header>
