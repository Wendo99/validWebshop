import { readable } from 'svelte/store';
import { prodDBInput } from './productDBInputStore';

let localProdArr: string[][];

export async function productData(locals: App.Locals, userCart: Map<string, string>) {
	const { subscribe } = readable(0);

	return {
		prodArr: await createPoductArray(locals, userCart),
		piecesSum: getPiecesSum(localProdArr),
		priceSum: getPriceSum(localProdArr),
		subscribe
	};
}

async function createPoductArray(locals: App.Locals, userCart: Map<string, string>) {
	const prodArr: string[][] = [];

	let index = 0;
	for (const [key, value] of userCart) {
		const prodId = parseInt(key);
		const productData: string[] = [];

		productData[0] = prodId.toString();
		productData[1] = (await prodDBInput(locals, prodId)).prodImgSrc;
		productData[2] = (await prodDBInput(locals, prodId)).prodPrice;
		productData[3] = (await prodDBInput(locals, prodId)).prodTitle;
		productData[4] = value;
		prodArr[index++] = productData;
	}
	localProdArr = prodArr;
	return prodArr;
}

function getPiecesSum(prodArr: string[][]): string {
	let result = 0;
	for (let index = 0; index < prodArr.length; index++) {
		const arr: string[] = prodArr[index];
		const qty = parseInt(arr[4]);
		result += qty;
	}
	return result.toString();
}

function getPriceSum(prodArr: string[][]): string {
	let result = 0;
	for (let index = 0; index < prodArr.length; index++) {
		const arr: string[] = prodArr[index];
		const price = parseFloat(arr[2]);
		const qty = parseInt(arr[4]);
		result = result + price * qty;
	}
	return result.toString();
}
