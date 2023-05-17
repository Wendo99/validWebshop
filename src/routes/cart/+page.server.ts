import { fail, type Cookies } from '@sveltejs/kit';
import type { Product } from '../+page.server';
import { zfd } from 'zod-form-data';

export async function load({ cookies, fetch }) {
	const hasUserCart: boolean = checkUserCart(cookies);
	let userCart: number[] = [];

	if (hasUserCart) {
		userCart = getUserCart(cookies);
	}

	const prodArr: Product[] = [];

	for (let indexUserCart = 0, indexProdArr = 0; indexUserCart < userCart.length; indexUserCart++) {
		const id = indexUserCart;
		if (userCart[id] != null) {
			const url = 'https://fakestoreapi.com/products/';
			const urlString = url + (id + 1);
			const result = await fetch(urlString).then((res) => res.json() as unknown as Product);
			prodArr[indexProdArr] = result;
			indexProdArr++;
		}
	}

	const piecesSum = getPiecesSum(userCart);
	const priceSum = getPriceSum(prodArr, userCart);

	return { userCart, productArray: prodArr, piecesSum, priceSum };
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

	

		const userId = await getUserId(locals);
		const prodId = result.data.prodId;
		const prodQty = await getProdQty(locals, prodId);
		const prodPrice = await getProdPrice(locals, prodId);

		const { error } = await locals.supaBase
			.from('user_Cart')
			.insert({
				user_id: userId,
				prodId: prodId,
				prodQty: prodQty,
				prodPrice: prodPrice
			});
		console.log(error);
		// const hasUserCart: boolean = checkUserCart(cookies);
		// let userCart: number[];

		// if (hasUserCart) {
		// 	userCart = getUserCart(cookies);
		// } else {
		// 	userCart = [];
		// }

		// const prodId: number = parseInt(formData.get('prodId') as string);
		// const indexUserCart = prodId - 1;

		// if (userCart[indexUserCart] == null) {
		// 	userCart[indexUserCart] = 1;
		// } else {
		// 	userCart[indexUserCart] = userCart[indexUserCart] + 1;
		// }
		// cookies.set('cart', JSON.stringify(userCart));
	}
};
async function getUserId(locals: App.Locals) {
	return await locals.supaBase.from('user_index').select('user_id');
}


async function getProdPrice(locals: App.Locals, prodId: number) {
	return await locals.supaBase.from('products').select('price').eq('id', prodId);
}

async function getProdQty(locals: App.Locals, prodId: number) {
	return await locals.supaBase.from('user_Cart').select('prodQty').eq('id', prodId);
}

async function inputCartProdPrice(locals: App.Locals, value: any) {
	const { error } = await locals.supaBase.from('user_Cart').insert({ prod_price: value });

}

async function inputCartProdId(locals: App.Locals, value: any) {
	const { error } = await locals.supaBase.from('user_Cart').insert({ prod_id: value });
	console.log(error);
}

function getUserCart(cookies: Cookies): number[] {
	const jSonObj = cookies.get('cart');
	let userCart: number[] = [];
	if (jSonObj) {
		userCart = JSON.parse(jSonObj);
	}
	return userCart;
}

function checkUserCart(cookies: Cookies): boolean {
	return cookies.get('cart') ? true : false;
}

function getPiecesSum(userCart: number[]): number {
	let result = 0;
	const sum = userCart.reduce((accum, current) => accum + current, result);
	return (result = sum);
}

// TODO check if reduce() is possible within multiDimensional Arrays
function getPriceSum(productArray: Product[], userCart: number[]): number {
	let result = 0;
	const tempArray: Product[] = productArray;
	for (let dataProdArrIndex = 0; dataProdArrIndex < tempArray.length; dataProdArrIndex++) {
		const productPrice = tempArray[dataProdArrIndex].price;
		const qty = userCart[tempArray[dataProdArrIndex].id - 1];
		result = result + productPrice * qty;
	}
	return result;
}
