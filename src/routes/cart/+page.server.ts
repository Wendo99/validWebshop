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

		const prodId = result.data.prodId;
		updateDatabase(locals, prodId);
	}
};

async function updateDatabase(locals: App.Locals, prodId: number) {
	const isProdInCart = await isProductInCart(locals, prodId);
	if (isProdInCart) {
		const { data } = await locals.supaBase.from('user_Cart').select('prodQty').eq('prodId', prodId);
		const prodQty = data?.map((item) => item.prodQty) as unknown as number[];
		{
			const oldProdQty = prodQty[0] as unknown as number;
			const newProdQty = oldProdQty + 1;
			const { data, error } = await locals.supaBase
				.from('user_Cart')
				.update({ prodQty: newProdQty })
				.eq('prodId', prodId);
		}
	} else {
		const { data } = await locals.supaBase.from('products').select('price').eq('id', prodId);
		const tempPrice = data?.map((item) => item.price);
		const prodPrice = tempPrice as unknown as number[];
		const { error } = await locals.supaBase
			.from('user_Cart')
			.insert([{ prodId: prodId, prodQty: 1, prodPrice: prodPrice[0] }]);
		console.log(error);
	}
}

async function isProductInCart(locals: App.Locals, prodId: number): Promise<boolean> {
	const { data } = await locals.supaBase.from('user_Cart').select('prodId').eq('prodId', prodId);
	const tempProdId = data?.map((item) => item.prodId) as any[];
	const prodIdInCart = tempProdId[0];
	return prodIdInCart == undefined ? false : true;
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
