import { fail, type Cookies, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';
import invariant from 'tiny-invariant';
import { getUserCart } from '../../store/cookieStore';
import { productData } from '../../store/productArrStore';
import { goto } from '$app/navigation';

export async function load({ cookies, locals }) {
	const userCart: Map<string, string> = (await getUserCart(cookies)).userCart;
	const pD = await productData(locals, userCart);

	const prodArr: string[][] = pD.prodArr;

	const piecesSum = pD.piecesSum;
	const priceSum = pD.priceSum;

	return { prodArr, piecesSum, priceSum };
}

export const actions = {
	checkCartStatus: async ({ locals, cookies }) => {
		console.log('checkCartStatus');
		const userCart: Map<string, string> = (await getUserCart(cookies)).userCart;
		const itemsInCart = (await productData(locals, userCart)).piecesSum;

		if (itemsInCart === '0') {
			return fail(403, { error: 'Cart is empty' });
		} else {
			throw redirect(300,'/payment');	
		}
	},

	addToCart: async ({ request, cookies }) => {
		//TODO formValidation
		const formData = await request.formData();
		const validationAddToCart = zfd.formData({
			prodId: zfd.numeric()
		});
		const result = await validationAddToCart.safeParseAsync(formData);
		if (!result.success) {
			// war wohl nix :(
			return fail(400, { error: result.error.flatten() });
		}

		const prodId: string = result.data.prodId.toString();
		putItemInCart(cookies, prodId);
	}
};

async function putItemInCart(cookies: Cookies, prodId: string) {
	const userCart: Map<string, string> = (await getUserCart(cookies)).userCart;
	if (userCart.has(prodId)) {
		const tmp = userCart.get(prodId);
		invariant(tmp != undefined, 'tmp is undefined');
		const newQty = (parseInt(tmp) + 1).toString();
		userCart.set(prodId, newQty);
	} else {
		userCart.set(prodId, '1');
	}
	const x = Object.fromEntries(userCart);
	cookies.set('cart', JSON.stringify(x));
}

// function getPiecesSum(prodArr: string[][]): string {
// 	let result = 0;
// 	for (let index = 0; index < prodArr.length; index++) {
// 		const arr: string[] = prodArr[index];
// 		const qty = parseInt(arr[4]);
// 		result += qty;
// 	}
// 	return result.toString();
// }

// // TODO check if reduce() is possible within multiDimensional Arrays
// function getPriceSum(prodArr: string[][]): string {
// 	let result = 0;
// 	for (let index = 0; index < prodArr.length; index++) {
// 		const arr: string[] = prodArr[index];
// 		const price = parseFloat(arr[2]);
// 		const qty = parseInt(arr[4]);
// 		result = result + price * qty;
// 	}
// 	return result.toString();
// }
