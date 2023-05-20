import { fail, type Cookies } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';
import invariant from 'tiny-invariant';
import { getUserCart } from '../../store/cookieStore';
import { get } from 'svelte/store';

export async function load({ cookies, locals }) {
	const userCart: Map<string, string> = (await getUserCart(cookies)).userCart;

	const prodArr: string[][] = [];

	let index = 0;
	for (const [key, value] of userCart) {
		const prodId = key;
		const productData: string[] = [];

		productData[0] = prodId;
		productData[1] = await getProdImgSrc(locals, parseInt(prodId));
		productData[2] = await getProdPrice(locals, parseFloat(prodId));
		productData[3] = await getProdTitle(locals, parseInt(prodId));
		productData[4] = value;
		prodArr[index++] = productData;
	}

	const piecesSum = getPiecesSum(prodArr);
	const priceSum = getPriceSum(prodArr);

	return { prodArr, piecesSum, priceSum };
}

async function getProdImgSrc(locals: App.Locals, prodId: number) {
	try {
		const { data, error } = await locals.supaBase.from('products').select('image').eq('id', prodId);
		if (data) {
			return data[0].image;
		}
	} catch (error) {
		console.error(error);
	}
}
async function getProdPrice(locals: App.Locals, prodId: number) {
	try {
		const { data, error } = await locals.supaBase.from('products').select('price').eq('id', prodId);
		if (data) {
			return data[0].price.toString();
		}
	} catch (error) {
		console.error(error);
	}
}
async function getProdTitle(locals: App.Locals, prodId: number) {
	try {
		const { data, error } = await locals.supaBase.from('products').select('title').eq('id', prodId);
		if (data) {
			return data[0].title.toString();
		}
	} catch (error) {
		console.error(error);
	}
}

// TODO change userCart into map
export const actions = {
	addToCart: async ({ request, cookies, locals }) => {
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

		// const hasUserCart: boolean = checkUserCart(cookies);

		// if (hasUserCart) {
		// 	userCart = getUserCart(cookies);
		// } else {
		// 	userCart = new Map();
		// }

		const userCart: Map<string, string> = (await getUserCart(cookies)).userCart;

		const prodId: string = result.data.prodId.toString();

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

	// checkCartStatus: async ({ cookies }) => {
	// 	const userCart = cookies.get('cart');
	// }
};

// async function updateDatabase(locals: App.Locals, prodId: number) {
// 	const isProdInCart = await isProductInCart(locals, prodId);
// 	if (isProdInCart) {
// 		const { data } = await locals.supaBase.from('user_Cart').select('prodQty').eq('prodId', prodId);
// 		const prodQty = data?.map((item) => item.prodQty) as unknown as number[];
// 		{
// 			const oldProdQty = prodQty[0] as unknown as number;
// 			const newProdQty = oldProdQty + 1;
// 			const { data, error } = await locals.supaBase
// 				.from('user_Cart')
// 				.update({ prodQty: newProdQty })
// 				.eq('prodId', prodId);
// 		}
// 	} else {
// 		const { data } = await locals.supaBase.from('products').select('price').eq('id', prodId);
// 		const tempPrice = data?.map((item) => item.price);
// 		const prodPrice = tempPrice as unknown as number[];
// 		const { error } = await locals.supaBase
// 			.from('user_Cart')
// 			.insert([{ prodId: prodId, prodQty: 1, prodPrice: prodPrice[0] }]);
// 		console.log(error);
// 	}
// }

// async function isProductInCart(locals: App.Locals, prodId: number): Promise<boolean> {
// 	const { data } = await locals.supaBase.from('user_Cart').select('prodId').eq('prodId', prodId);
// 	const tempProdId = data?.map((item) => item.prodId) as any[];
// 	const prodIdInCart = tempProdId[0];
// 	return prodIdInCart == undefined ? false : true;
// }

// function getUserCart(cookies: Cookies): Map<string, string> {
// 	const jSonObj = cookies.get('cart');
// 	let userCart: Map<string, string> = new Map();
// 	if (jSonObj) {
// 		const temp = JSON.parse(jSonObj);
// 		userCart = new Map(Object.entries(temp));
// 	}
// 	return userCart;
// }

// function checkUserCart(cookies: Cookies): boolean {
// 	return cookies.get('cart') ? true : false;
// }

function getPiecesSum(prodArr: string[][]): string {
	let result = 0;
	for (let index = 0; index < prodArr.length; index++) {
		const arr: string[] = prodArr[index];
		const qty = parseInt(arr[4]);
		result += qty;
	}
	return result.toString();
}

// TODO check if reduce() is possible within multiDimensional Arrays
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
