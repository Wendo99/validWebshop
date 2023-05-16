<div class="grid grid-cols-2 grid-rows-2 gap-y-8">
	<div class="grid row-start-1 items-center">
		<span class="grid col-start-1 justify-items-start">IBAN</span>
		<span class=" justify-items-end grid col-start-2 items-center"
			><span class="grid row-start-1">DE-</span><input
			name="account_IBAN"
				id="account_IBAN"
				type="number"
				class="rounded-xl h-8 w-60 grid row-start-1"
				required
				min="111111111111111111"
				max="999999999999999999"
			/></span
		>
	</div>
	<div class="grid row-start-2">
		<span class="grid col-start-1 justify-items-start">Account Holder</span>
		<div class=" justify-items-end grid col-start-2">
			<input name="account_Holder_BP" id="account_Holder" type="text" class="rounded-xl h-8 w-60" required />
		</div>
	</div>
</div>
