<script lang="ts">
	import { enhance } from '$app/forms';
	import BtnDefault from '$lib/components/btn_default.svelte';
	import CreditCard from './paymentOptions/creditCard.svelte';

	const paymentMethods = [
		{ value: 'creditcard', text: 'CreditCard' },
		{ value: 'payPal', text: 'PayPal' },
		{ value: 'bankPayment', text: 'BankPayment' }
	];
	const name = 'payMent';
	export let chosenPaymentMethod = '';
</script>

<svelte:head><title>Payment</title></svelte:head>

<div class="min-h-screen">
	<form action="" method="post" use:enhance class="grid auto-cols-max">
		<div>
			<div>Please enter your postadress</div>
			<div>
				<div>
					Firstname <input type="text" name="firstName" />
					Lastname <input type="text" name="lastName" />
				</div>
				<div>
					Street <input type="text" name="street" />
					House Number <input type="text" name="houseNumber" />
				</div>
				<div>
					City <input type="text" name="street" />
					Postcode <input type="text" name="postcode" />
				</div>
				<div>
					Birthday<input type="text" name="birthDay" />
				</div>
			</div>
		</div>
		<div>
			<div>Payment Methods</div>
			<div class="grid grid-cols-2">
				{#each paymentMethods as { value, text }}
					<input on:change={(e) => (chosenPaymentMethod = value)} type="radio" {name} {value} />
					<span>{text}</span>
				{/each}
			</div>
			<div class="bg-gray-600 hidden h-32 w-40" />

			<div>
				<a href="src\routes\payment\paymentOptions\payPal.svelte">
					<BtnDefault text={'Continue'} ></BtnDefault>
                    {chosenPaymentMethod}
				</a>
			</div>
		</div>
	</form>
</div>
