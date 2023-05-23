<script lang="ts">
	import BoxDiv from '$lib/types/DivDefault.svelte';
	import ButtonFinalizePayment from '$lib/types/ButtonDefault.svelte';
	import DhlBox from './deliveryOptions/dhlBox.svelte';
	import BankPayment from './paymentOptions/bankPayment.svelte';
	import CreditCard from './paymentOptions/creditCard.svelte';
	import PayPal from './paymentOptions/payPal.svelte';

	export let data;

	//TODO store payment- and deliveryOptions anywhere more safe
	const paymentOptions = [
		{ value: 'creditCard', text: 'CreditCard' },
		{ value: 'payPal', text: 'PayPal' },
		{ value: 'bankPayment', text: 'BankPayment' }
	];
	export let chosenPaymentMethod: string = '';

	const deliveryOptions = [
		{ value: 'delivery_Home', text: 'Home Delivery' },
		{ value: 'delivery_DHLBox', text: 'DHL Box' }
	];
	export let chosenDeliveryMethod: string = '';
</script>

<svelte:head><title>Checkout</title></svelte:head>
<div class="min-h-screen mt-14">
	<form action="?/validateCheckout" method="post">
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
								<ButtonFinalizePayment type="submit">Finalize Payment</ButtonFinalizePayment>
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
										name="user_firstName"
										class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-none h-8 w-56 grid col-start-2 mr-6"
										value={data.userAdress?.user_firstName}
									/>
									<span class=" grid col-start-3 w-32"> Lastname </span>
									<input
										class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-none h-8 justify-self-end grid col-start-4 w-56"
										type="text"
										name="user_lastName"
										value={data.userAdress?.user_lastName}
									/>
								</div>
								<div class="grid row-start-2 gap-x-8 p-2">
									<span class=" grid col-start-1 w-20">Street</span>
									<input
										class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-none h-8 w-56 grid col-start-2 mr-6"
										type="text"
										name="user_street"
										value={data.userAdress?.user_street}
									/>
									<span class=" grid col-start-3 w-32">House Number</span>
									<input
										class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-none h-8 justify-self-end w-56 grid col-start-4"
										type="number"
										name="user_houseNumber"
										value={data.userAdress?.user_houseNumber}
									/>
								</div>
								<div class=" grid row-start-3 gap-x-8 p-2">
									<span class=" grid col-start-1 w-20">City</span>
									<input
										class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-none h-8 w-56 grid col-start-2 mr-6"
										type="text"
										name="user_city"
										value={data.userAdress?.user_city}
									/>
									<span class=" grid col-start-3 w-32">Postcode</span>
									<input
										class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-none h-8 justify-self-end w-56 grid col-start-4"
										type="number"
										name="user_postcode"
										min="10000"
										max="99999"
										value={data.userAdress?.user_postcode}
									/>
								</div>
								<div class="items-center grid row-start-4 gap-x-1 grid-flow-col p-2">
									<span class="items-center grid col-start-1">Birthday </span>
									<span class="items-center text-sm grid col-start-2"
										><input
											type="date"
											name="user_birthday"
											id="birthday"
											min="1900-01-01"
											class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-none h-8
										w-56 text-lg"
											value={data.userAdress?.user_birthday}
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
								{#each paymentOptions as { value, text }}
									<div>
										<input
											on:change={(e) => (chosenPaymentMethod = value)}
											type="radio"
											name="user_pref_payment"
											{value}
										/>
										<span>{text}</span>
									</div>
								{/each}
							</div>
							<div class="mt-20">
								{#if chosenPaymentMethod === 'creditCard'}
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
								{#each deliveryOptions as { value, text }}
									<div>
										<input
											on:change={(e) => (chosenDeliveryMethod = value)}
											type="radio"
											name="user_pref_delivery"
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
