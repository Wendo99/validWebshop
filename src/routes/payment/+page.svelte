<script lang="ts">
	import BoxDiv from '$lib/types/DivDefault.svelte';
	import ButtonFinalizePayment from '$lib/types/ButtonDefault.svelte';
	import DhlBox from './deliveryOptions/dhlBox.svelte';
	import BankPayment from './paymentOptions/bankPayment.svelte';
	import CreditCard from './paymentOptions/creditCard.svelte';
	import PayPal from './paymentOptions/payPal.svelte';
	import { getCurrencyString } from '$lib/utils/currencyUtils';
	import { checkIfStringIsUndefined } from '$lib/utils/userAdressUtils';
	import RequieredStar from '$lib/types/RequieredStar.svelte';

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

<svelte:head><title>Juvenile &#8226; Checkout</title></svelte:head>

<main class="min-h-screen p-2 max-w-full">
	<h1 class="text-3xl font-bold mb-12">Checkout</h1>
	<form action="?/validateCheckout" method="post">
		<h2 class="text-lg font-semibold mb-4">Please enter your data</h2>
		<div class="grid grid-cols-2">
			<div class="grid grid-cols-5 gap-y-5 min-w-max auto-rows-min gap-x-5">
				<BoxDiv class="row-start-1 grid grid-rows-3 col-start-2  w-72">
					<div class="text-lg">Overview</div>
					<div class="text-xl font-bold row-start-2 justify-self-center">
						{getCurrencyString(data.priceSum)}
					</div>

					<ButtonFinalizePayment
						class="row-start-3 justify-self-center place-self-end"
						type="submit">Finalize Payment</ButtonFinalizePayment
					>
				</BoxDiv>

				<div class="grid row-start-1">
					<BoxDiv
						><div class="">
							<div class="text-lg mb-8">Postadress</div>
							<div class="grid grid-flow-row gap-y-10">
								<div class="grid row-start-1 gap-x-8 items-center">
									<span class=" text-xs font-medium tracking-widest text-gray-600 col-start-1 w-20">
										Firstname<RequieredStar /></span
									>
									<input
										type="text"
										name="user_firstName"
										class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 h-8 w-56 grid col-start-3 mr-6 outline-green border border-gray-200"
										value={checkIfStringIsUndefined(data.userAdress?.user_firstName, 'text')}
										required
									/>
									<span class="text-xs font-medium tracking-widest text-gray-600 col-start-4 w-32">
										Lastname<RequieredStar /></span
									>
									<input
										class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-green h-8 justify-self-end grid col-start-6 w-56 border border-gray-200"
										type="text"
										name="user_lastName"
										value={checkIfStringIsUndefined(data.userAdress?.user_lastName, 'text')}
										required
									/>
								</div>
								<div class=" grid row-start-2 gap-x-8 items-center">
									<span class="text-xs font-medium tracking-widest text-gray-600 col-start-1 w-20"
										>Street<RequieredStar /></span
									>
									<input
										class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-green h-8 w-56 grid col-start-3 mr-6 border border-gray-200"
										type="text"
										name="user_street"
										value={checkIfStringIsUndefined(data.userAdress?.user_street, 'text')}
										required
									/>
									<span class="text-xs font-medium tracking-widest text-gray-600 col-start-4 w-32"
										>House Number<RequieredStar /></span
									>
									<input
										class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-green h-8 justify-self-end w-56 grid col-start-6 border border-gray-200"
										type="number"
										name="user_houseNumber"
										value={checkIfStringIsUndefined(data.userAdress?.user_houseNumber, 'number')}
										required
									/>
								</div>
								<div class="  grid row-start-3 gap-x-8 items-center">
									<span class="text-xs font-medium tracking-widest text-gray-600 col-start-1 w-20"
										>City<RequieredStar /></span
									>
									<input
										class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-green h-8 w-56 grid col-start-3 mr-6 border border-gray-200"
										type="text"
										name="user_city"
										value={checkIfStringIsUndefined(data.userAdress?.user_city, 'text')}
										required
									/>
									<span class="text-xs font-medium tracking-widest text-gray-600 col-start-4 w-32"
										>Postcode <RequieredStar /></span
									>
									<input
										class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-green h-8 justify-self-end w-56 grid col-start-6 border border-gray-200"
										type="number"
										name="user_postcode"
										min="10000"
										max="99999"
										value={checkIfStringIsUndefined(data.userAdress?.user_postcode, 'number')}
										required
									/>
								</div>
								<div class="items-center grid row-start-4 gap-x-1 grid-flow-col">
									<span
										class="items-center text-xs font-medium tracking-widest text-gray-600 col-start-1"
										>Birthday <RequieredStar /></span
									>
									<span class="items-center text-sm grid col-start-2"
										><input
											type="date"
											name="user_birthday"
											id="birthday"
											min="1900-01-01"
											class="shadow-1xl drop-shadow-lg sm:text-sm rounded-md p-2 outline-green h-8
										w-56 text-lg border border-gray-200"
											value={data.userAdress?.user_birthday}
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
						<div class="">
							<div class="text-lg mb-8">Payment Methods</div>
							<div class="grid grid-flow-col">
								{#each paymentOptions as { value, text }}
									<div class="text-xs font-medium tracking-widest text-gray-600">
										<input
											on:change={(e) => (chosenPaymentMethod = value)}
											type="radio"
											name="user_pref_payment"
											{value}
											required
										/>
										<span class="ml-2">{text}</span>
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
						<div class="">
							<div class="text-lg mb-8">Delivery Methods</div>
							<div class="grid grid-flow-col">
								{#each deliveryOptions as { value, text }}
									<div class="text-xs font-medium tracking-widest text-gray-600">
										<input
											on:change={(e) => (chosenDeliveryMethod = value)}
											type="radio"
											name="user_pref_delivery"
											{value}
											required
										/>
										<span class="ml-2">{text}</span>
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
</main>
