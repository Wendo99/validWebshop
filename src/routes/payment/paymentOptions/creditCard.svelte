<div class="grid grid-rows-2 gap-y-8">
	<div class="grid row-start-1 grid-flow-col">
		<div class="h-8">
			<input
				class="mr-1 rounded-xl"
				type="radio"
				name="creditCard_Provider"
				id="visa"
				required
			/><span>Visa</span>
		</div>
		<div class="h-8">
			<input
				class="mr-1 rounded-xl"
				type="radio"
				name="creditCard_Provider"
				id="mastercard"
				required
			/>
			<span>Mastercard</span>
		</div>
		<div class="h-8">
			<input
				class="mr-1 rounded-xl"
				type="radio"
				name="creditCard_Provider"
				id="americanExpress"
				required
			/><span>American Express</span>
		</div>
	</div>
	<div class="grid row-start-2 grid-cols-4 gap-y-4">
		<span class="grid col-start-1 justify-items-start">Account holder name</span>
		<div class="w-40 justify-items-end grid col-start-2">
			<input id="account_Holder" type="text" class="p-2 w-80 max-h-7 rounded-xl h-8" required />
		</div>
		<span class="grid col-start-1 justify-items-start">Creditcard number</span>
		<div class="w-40 justify-items-end grid col-start-2">
			<input type="number" id="creditcardNumber" class="p-2 w-80 max-h-7 rounded-xl h-8" required min="1111111111111111" max="9999999999999999"/>
		</div>
	</div>
</div>
