<script lang="ts">
	import { onMount } from 'svelte';
	import BtnDefault from './components/btn_default.svelte';
	import ImgDefault from './components/imgDefault.svelte';
	let linkLogin = '/signIn';
	let compHeader = 'Donkey';
	let loginButton:BtnDefault;

	onMount(() => {
		loginButton.changeButtonType('submit');
	});

	export let user_eMail: string | undefined;
</script>

<header class="rounded-lg grid grid-cols-2 items-start">
	<div class=" grid grid-flow-col justify-start gap-3 items-center py-2">
		<a href="/"
			><img src="logo_872x872.png" width="96" height="96" alt="company logo black donkey" /></a
		>
		<h2 id="compHeader" class="text-5xl">Donkey</h2>
	</div>
	<div class=" grid grid-rows-4 col-start-2 grid-cols-12">
		<div
			class="grid row-start-2 items-center justify-items grid-flow-col row-span-3 justify-items-end col-span-12"
		>
			<div class="">
				{#if user_eMail != undefined}
					<form action="/signIn?/logout" method="post">
						<BtnDefault bind:this={loginButton} style="grid grid-cols-2  items-center "
							><div class=" justify-self-start">Logout</div>
							<ImgDefault
								width="40"
								height="40"
								classStyle=" justify-self-end"
								src="login.svg"
								alt="login button"
							/></BtnDefault
						>
					</form>
				{:else if user_eMail == undefined}
					<a href={linkLogin}>
						<BtnDefault style="grid grid-cols-2  items-center "
							><div class=" justify-self-start">Login</div>
							<ImgDefault
								width="40"
								height="40"
								classStyle=" justify-self-end"
								src="login.svg"
								alt="login button"
							/></BtnDefault
						>
					</a>
				{/if}
			</div>
			<!-- <div>
			<a href="">
				<button class="rounded-full border p-2 w-40 h-14" id="account">Account</button>
			</a>
		</div> -->

			<a href="/cart">
				<BtnDefault style="grid grid-cols-2   items-center">
					<div class=" justify-self-start">Basket</div>
					<ImgDefault
						width="40"
						height="40"
						classStyle=" justify-self-end"
						src="shoppingBasket.svg"
						alt="shopping basket"
					/>
				</BtnDefault>
			</a>
		</div>
		<div class=" row-start-5 col-span-4 col-start-4 text-center">
			{#if user_eMail == undefined}
				{''}
			{:else}
				{user_eMail}
			{/if}
		</div>
	</div>
</header>
