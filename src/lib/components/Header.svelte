<script lang="ts">
	import ButtonSubmit from '../types/ButtonDefault.svelte';
	import ImageDefault from '../types/ImageDefault.svelte';
	import BasketBtn from './ButtonBasket.svelte';
	let linkLogin = '/logging/signIn';

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
					<form action="/logging/signIn?/logout" method="post">
						<ButtonSubmit classStyle="grid grid-cols-2  items-center "
							><div class=" justify-self-start">Logout</div>
							<ImageDefault
								width="80"
								height="80"
								classStyle=" justify-self-end"
								src="login.svg"
								alt="login button"
							/></ButtonSubmit
						>
					</form>
				{:else if user_eMail == undefined}
					<a href={linkLogin}>
						<ButtonSubmit classStyle="grid grid-cols-2  items-center "
							><div class=" justify-self-start">Login</div>
							<ImageDefault
								width="80"
								height="80"
								classStyle=" justify-self-end"
								src="login.svg"
								alt="login button"
							/></ButtonSubmit
						>
					</a>
				{/if}
			</div>
			<!-- <div>
			<a href="">
				<button class="rounded-full border p-2 w-40 h-14" id="account">Account</button>
			</a>
		</div> -->

			<BasketBtn />
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
