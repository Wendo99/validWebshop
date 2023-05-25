<script>
	import InputDefault from '$lib/types/InputDefault.svelte';
	import RequieredStar from '$lib/types/RequieredStar.svelte';
</script>

<div class="grid grid-rows-2 gap-y-8">
	<div class="grid row-start-1 grid-flow-col">
		<div class="h-8">
			<input
				class="mr-1 rounded-md"
				type="radio"
				name="creditCard_Provider"
				id="visa"
				value="visa"
				required
			/><span class=" ml-2 text-xs font-medium tracking-widest text-gray-600">Visa</span>
		</div>
		<div class="h-8">
			<input
				class="mr-1 rounded-md"
				type="radio"
				name="creditCard_Provider"
				id="mastercard"
				value="mastercard"
				required
			/>
			<span class="ml-2 text-xs font-medium tracking-widest text-gray-600">Mastercard</span>
		</div>
		<div class="h-8">
			<input
				class="mr-1 rounded-md"
				type="radio"
				name="creditCard_Provider"
				id="americanExpress"
				value="americanExpress"
				required
			/><span class=" ml-2 text-xs font-medium tracking-widest text-gray-600">American Express</span
			>
		</div>
	</div>
	<div class="grid row-start-2 grid-cols-4 gap-y-4 items-center">
		<span class=" col-start-1 justify-items-start text-xs font-medium tracking-widest text-gray-600"
			>Account holder name<RequieredStar /></span
		>
		<div class="w-40 justify-items-end grid col-start-2">
			<InputDefault
				id="account_Holder"
				type="text"
				class="p-2 w-80 max-h-7 rounded-md h-8"
				name="account_Holder_CC"
				required
			/>
		</div>
		<span class=" col-start-1 justify-items-start text-xs font-medium tracking-widest text-gray-600"
			>Creditcard number<RequieredStar /></span
		>
		<div class="w-40 justify-items-end grid col-start-2">
			<InputDefault
				type="number"
				id="creditcardNumber"
				class="p-2 w-80 max-h-7  h-8"
				min="1111111111111111"
				max="9999999999999999"
				name="creditcardNumber"
				required
			/>
		</div>
	</div>
</div>
