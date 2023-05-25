<script>
	import InputDefault from '$lib/types/InputDefault.svelte';
	import RequieredStar from '$lib/types/RequieredStar.svelte';
</script>

<div class="grid grid-cols-2 grid-rows-2 gap-y-8">
	<div class="grid row-start-1 items-center">
		<span class="grid col-start-1 justify-items-start items-center">IBAN</span>
		<div class=" justify-items-end grid col-start-2 items-center">
			<span class=" row-start-1">DE-<RequieredStar /></span>
			<InputDefault
				name="account_IBAN"
				id="account_IBAN"
				type="number"
				class=" h-8 w-60 grid row-start-1 items-center"
				required
				min="111111111111111111"
				max="999999999999999999"
			/>
		</div>
	</div>
	<div class="grid row-start-2">
		<span class=" col-start-1 justify-items-start items-center">Account Holder<RequieredStar /></span>
		<div class=" justify-items-end items-center grid col-start-2">
			<InputDefault
				class=" h-8 w-60"
				name="account_Holder_BP"
				id="account_Holder"
				type="text"
				required
			/>
		</div>
	</div>
</div>
