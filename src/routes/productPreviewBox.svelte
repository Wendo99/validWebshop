<script lang="ts">
	let src = './pic1.jpg';
	let productBrand: string = 'BOSS';
	let productName: string = 'Mangulo';
	let colors: string[] = ['red', 'green', 'blue'];
	let price: number = 149.99;
	let currency: string = '€';
	let sizes: string[] = [' S ', ' M ', ' L ', ' XL '];
</script>

<div id="box" class=" box-border overflow-auto w-1/5 p-4 rounded-lg bg-secBrown ">
	<div id="content">
		<div id="prodImage"><img class="rounded-lg mb-4" {src} alt="jacket grey" /></div>
		<div id="productInfo" class="grid grid-row-3 gap-3">
			<div id="product" class="grid grid-flow-col">
				<div id="productBrand" class="">
					<div>{productBrand}</div>
				</div>
				<div id="productName" class=""><div>{productName}</div></div>
			</div>
			<div id="financial" class="grid grid-flow-col justify-start gap-2">
				<div id="price">{price}</div>
				<div id="currency">
					{currency}
				</div>
			</div>
			<div id="productSpecifier" class="grid grid-cols-2">
				<div id="colorVar" class="grid grid-flow-col">
					<div id="color1"><button class="rounded-full w-3 h-3 bg-red-500" /></div>
					<div id="color2"><button class="rounded-full w-3 h-3 bg-red-500" /></div>
					<div id="color3"><button class="rounded-full w-3 h-3 bg-red-500" /></div>
				</div>
				<div id="sizes">{sizes}</div>
			</div>
		</div>
	</div>
</div>