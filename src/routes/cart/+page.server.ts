import type { Cookies } from '@sveltejs/kit';
import type { Product } from '../+page.server';

export async function load({ cookies, fetch, locals: {supaBase}}) {

	supaBase()
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

export const actions = {
	addToCart: async ({ request, cookies }) => {
		const formData = await request.formData();
		const hasUserCart: boolean = checkUserCart(cookies);
		let userCart: number[];
		if (hasUserCart) {
			userCart = getUserCart(cookies);
		} else {
			userCart = [];
		}
		const prodId: number = parseInt(formData.get('prodId') as string);
		const indexUserCart = prodId - 1;
		if (userCart[indexUserCart] == null) {
			userCart[indexUserCart] = 1;
		} else {
			userCart[indexUserCart] = userCart[indexUserCart] + 1;
		}
		cookies.set('cart', JSON.stringify(userCart));
	}
};

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
