<script lang="ts">
	import ImgDefault from './components/imgDefault.svelte';

	let loginBtn = 'Login';
	let accountBtn = 'Account';
	let cartBtn = 'Cart';
	let linkLogin = '/signIn';
	let compHeader = 'Donkey';

	export let user_eMail: string | undefined;
</script>

<header class="p-2 mb-10">
	<div class="grid grid-flow-col items-start">
		<div class="  grid grid-flow-col justify-start content-center gap-3">
			<div class=" grid justify-items-center items-center">
				<a href="/"
					><img src="logo_872x872.png" width="96" height="96" alt="company logo black donkey" /></a
				>
			</div>
			<div class=" grid justify-items-center items-center">
				<h2 id="compHeader" class="text-5xl">{compHeader}</h2>
			</div>
		</div>
		<div
			class=" grid grid-flow-col auto-cols-fr items-center text-1xl font-semibold justify-items-center"
		>
			<div class=" grid justify-items-center items-center">
				<input id="searchBar" type="text" class=" rounded-xl h-8" />
				<div id="userName" />
			</div>
			<div class="grid grid-flow-row-dense auto-rows-min relative top-3">
				{#if user_eMail != undefined}
					<form action="/signIn?/logout" method="post">
						<button class="rounded-full border p-2 w-40 h-14" type="submit">Logout</button>
					</form>
				{:else if user_eMail == undefined}
					<a href={linkLogin} class="p-2">
						<button class="rounded-full border p-2 w-40 h-14" id="login">Login</button>
					</a>
				{/if}

				<div class="grid items-center justify-items-center">
					{#if user_eMail == undefined}
						{''}
					{:else}
						{user_eMail}
					{/if}
				</div>
			</div>
			<div class="">
				<a href="" class="p-2">
					<button class="rounded-full border p-2 w-40 h-14" id="account">Account</button>
				</a>
			</div>
			<div class="  grid auto-rows-auto auto-cols-auto">
				<a href="/cart" class="p-2">
					<button
						class="grid grid-flow-col auto-cols-fr rounded-full border p-3 w-40 justify-items-center items-center text-2xl"
						id="cart"
						><span>Basket</span><ImgDefault src="shoppingBasket.svg" alt="shopping basket" />
					</button>
				</a>
			</div>
		</div>
	</div>
</header>
