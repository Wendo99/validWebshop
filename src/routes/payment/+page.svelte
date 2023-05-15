<script lang="ts">
	import BoxDiv from '$lib/components/box_div.svelte';
	import BtnSubmit from '$lib/components/btn_submit.svelte';
	import DhlBox from './deliveryOptions/dhlBox.svelte';
	import BankPayment from './paymentOptions/bankPayment.svelte';
	import CreditCard from './paymentOptions/creditCard.svelte';
	import PayPal from './paymentOptions/payPal.svelte';

	export let data;

	const paymentMethods = [
		{ value: 'creditcard', text: 'CreditCard' },
		{ value: 'payPal', text: 'PayPal' },
		{ value: 'bankPayment', text: 'BankPayment' }
	];
	const namePay = 'payMent';
	export let chosenPaymentMethod: string = '';

	const deliveryMethods = [
		{ value: 'delivery_Home', text: 'Home Delivery' },
		{ value: 'delivery_DHLBox', text: 'DHL Box' }
	];
	const nameDel = 'payMent';
	export let chosenDeliveryMethod: string = '';
</script>

<svelte:head><title>Checkout</title></svelte:head>
<div class="min-h-screen">
	<form action="?/validateCheckout" method="post">
		<h1 class="text-center text-2xl mb-6">Please enter your data</h1>
		<div class="grid grid-cols-2">
			<div class="grid grid-cols-5 gap-y-5 min-w-max auto-rows-min gap-x-5">
				<div class="grid col-start-2 w-1/2 h-1/3 auto-rows-fr">
					<BoxDiv>
						<div class="grid grid-flow-row p-2 row-start-1">
							<div class="text-lg mb-8">Overview:</div>
							<div class="text-lg font-bold row-start-2 grid items-center">
								{data.priceSum} €
							</div>
							<div class=" row-start-2 grid items-center justify-end">
								<BtnSubmit text={'Continue'} />
							</div>
						</div>
					</BoxDiv>
				</div>
				<div class="grid row-start-1">
					<BoxDiv
						><div class="p-2">
							<div class="text-lg mb-8">Postadress:</div>
							<div class="grid grid-flow-row gap-y-10">
								<div class="grid row-start-1 gap-x-8">
									<span class=" grid col-start-1 w-20"> Firstname </span>
									<input
										type="text"
										name="firstName"
										class="rounded-xl h-8 w-56 grid col-start-2 mr-6"
										required
									/>
									<span class=" grid col-start-3 w-32"> Lastname </span>
									<input
										class="rounded-xl h-8 justify-self-end grid col-start-4 w-56"
										type="text"
										name="lastName"
										required
									/>
								</div>
								<div class="grid row-start-2 gap-x-8 p-2">
									<span class=" grid col-start-1 w-20">Street</span>
									<input
										class="rounded-xl h-8 w-56 grid col-start-2 mr-6"
										type="text"
										name="street"
										required
									/>
									<span class=" grid col-start-3 w-32">House Number</span>
									<input
										class="rounded-xl h-8 justify-self-end w-56 grid col-start-4"
										type="number"
										name="houseNumber"
										required
									/>
								</div>
								<div class=" grid row-start-3 gap-x-8 p-2">
									<span class=" grid col-start-1 w-20">City</span>
									<input
										class="rounded-xl h-8 w-56 grid col-start-2 mr-6"
										type="text"
										name="city"
										required
									/>
									<span class=" grid col-start-3 w-32">Postcode</span>
									<input
										class="rounded-xl h-8 justify-self-end w-56 grid col-start-4"
										type="number"
										name="postcode"
										min="10000"
										max="99999"
										required
									/>
								</div>
								<div class="items-center grid row-start-4 gap-x-1 grid-flow-col p-2">
									<span class="items-center grid col-start-1">Birthday </span>
									<span class="items-center text-sm grid col-start-2"
										><input
											type="date"
											name="birthday"
											id="birthday"
											min="1900-01-01"
											class="rounded-xl h-8
										w-56 text-lg p-2"
										required
										/>
									</span>
								</div>
							</div>
						</div>
					</BoxDiv>
				</div>
				<div class="grid row-start-2 auto-rows-min relative">
					<BoxDiv>
						<div class="p-2">
							<div class="text-lg mb-8">Payment Methods:</div>
							<div class="grid grid-flow-col">
								{#each paymentMethods as { value, text }}
									<div>
										<input
											on:change={(e) => (chosenPaymentMethod = value)}
											type="radio"
											name={namePay}
											required
											{value}
										/>
										<span>{text}</span>
									</div>
								{/each}
							</div>
							<div class="mt-20">
								{#if chosenPaymentMethod === 'creditcard'}
									<CreditCard />
								{:else if chosenPaymentMethod === 'payPal'}
									<PayPal />
								{:else if chosenPaymentMethod === 'bankPayment'}
									<BankPayment />
								{/if}
							</div>
						</div>
					</BoxDiv>
				</div>
				<div class="grid row-start-3 auto-rows-min relative">
					<BoxDiv>
						<div class="p-2">
							<div class="text-lg mb-8">Delivery Methods:</div>
							<div class="grid grid-flow-col">
								{#each deliveryMethods as { value, text }}
									<div>
										<input
											on:change={(e) => (chosenDeliveryMethod = value)}
											type="radio"
											name={nameDel}
											required
											{value}
										/>
										<span>{text}</span>
									</div>
								{/each}
							</div>
							<div class="mt-20">
								{#if chosenDeliveryMethod === 'delivery_DHLBox'}
									<DhlBox />
								{/if}
							</div>
						</div>
					</BoxDiv>
				</div>
			</div>
		</div>
	</form>
</div>
