import { readable } from 'svelte/store';
import { prodDBInput } from './productDBInputStore';

export async function getProductArray(locals: App.Locals, userCart: Map<string, string>) {
	const { subscribe } = readable(0);

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
	return { prodArr: prodArr, subscribe };
}
