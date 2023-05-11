<script lang="ts">
	export let src: string;
	export let title: string;
	export let price: number;
	export let qty: number;
</script>

<div class=" h-24 mb-7 scale-90">
	<div
		class="grid bg-slate-200 grid-rows-2 grid-cols-12 border-6 rounded-xl p-2 shadow-2xl drop-shadow-md opacity-90 hover:ring-2 hover:ring-gray-50"
	>
		<div class="grid row-span-2 col-start-1 w-24 items-center justify-items-center">
			<img {src} alt="prodPic" class="w-16 h-auto" />
		</div>
		<div class="grid row-span-2 col-span-11">
			<div class="grid justify-center self-center text-base font-semibold">
				{title}
			</div>
			<div class=" grid justify-end content-center font-bold text-gray-600">
				{price} €
			</div>
			<div class="  grid justify-end content-center font-bold text-gray-500">
				{qty}
				{#if qty > 1}
					pieces
				{:else}
					piece
				{/if}
			</div>
		</div>
	</div>
</div>
