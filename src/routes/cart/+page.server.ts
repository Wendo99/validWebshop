import { fail, type Cookies } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';
import invariant from 'tiny-invariant';
import { map } from 'zod';

export async function load({ cookies, fetch, locals }) {
	const hasUserCart: boolean = checkUserCart(cookies);
	const prodDataArr: string[] = [];
	let userCart: Map<string, string[]> = new Map();
	const prodArr = [];

	if (hasUserCart) {
		userCart = getUserCart(cookies);
	}
	let index = 0;

	for (const [key, value] of userCart) {
		const prodId = key;
		console.log(index);
		prodDataArr[0] = prodId;
		prodDataArr[1] = await getProdImgSrc(locals, parseInt(prodId));
		prodDataArr[2] = await getProdPrice(locals, parseInt(prodId));
		prodDataArr[3] = await getProdTitle(locals, parseInt(prodId));
		prodDataArr[4] = value[1];
		prodArr[index] = prodDataArr;
		console.log(prodDataArr);
		console.log(prodArr);
		index++;
	}

	const piecesSum = getPiecesSum(prodArr);
	const priceSum = getPriceSum(prodArr);

	// console.log(userCart);
	// console.log(prodMap);

	// const pArr: string[][] = [];
	// let index = 0;
	// for (const key in prodMap) {
	// 	if (Object.prototype.hasOwnProperty.call(prodMap, key)) {
	// 		const element = prodMap.get(key);
	// 		if (element != undefined) {
	// 			pArr[index] = element;
	// 		}
	// 		index++;
	// 	}
	// }

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

		const hasUserCart: boolean = checkUserCart(cookies);
		let userCart: Map<string, string[]>;

		let prodData: string[] | undefined = ['0', '0'];

		if (hasUserCart) {
			userCart = getUserCart(cookies);
		} else {
			userCart = new Map();
		}
		const prodId: string = result.data.prodId.toString();
		if (userCart.has(prodId)) {
			const data = userCart.get(prodId);
			invariant(data != null, 'cart item exists but is null');
			const temp = parseInt(data[1]);
			if (prodData != undefined) {

				console.log(1)
				console.log(prodData)
				prodData = userCart.get(prodId);
				prodData[0] = prodId;
				prodData[1] = (temp + 1).toString();
			}
		} else {
			prodData[0] = prodId;
			prodData[1] = '1';
		}
		userCart.set(prodId, prodData);
		const x = Object.fromEntries(userCart);
		cookies.set('cart', JSON.stringify(x));
	}
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

function getUserCart(cookies: Cookies): Map<string, string[]> {
	const jSonObj = cookies.get('cart');
	let userCart: Map<string, string[]> = new Map();
	if (jSonObj) {
		const temp = JSON.parse(jSonObj);
		userCart = new Map(Object.entries(temp));
	}
	return userCart;
}

function checkUserCart(cookies: Cookies): boolean {
	return cookies.get('cart') ? true : false;
}

function getPiecesSum(prodArr): string {
	let result = 0;
	for (let index = 0; index < prodArr.length; index++) {
		const element = prodArr[index];
		const qty = parseInt(element[4]);
		result = +qty;
	}
	return result.toString();
}

// TODO check if reduce() is possible within multiDimensional Arrays
function getPriceSum(prodArr): string {
	let result = 0;

	for (let index = 0; index < prodArr.length; index++) {
		const element = prodArr[index];
		const price = parseInt(element[2]);
		const qty = parseInt(element[4]);
		result = result + price * qty;
	}
	return result.toString();
}
