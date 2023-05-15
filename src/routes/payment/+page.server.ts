import type { Cookies } from '@sveltejs/kit';
import type { Product } from '../+page.server';


//TODO MAYBE merge functionality of pieceSum,priceSum,productArray, usercart with load func of +page.server.ts
export async function load({ cookies, fetch }) {
	const userCart: number[] = getUserCart(cookies);

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
	paymentProcessing: async ({ request }) => {
		const form = await request.formData();
		const priceSum = form.get('priceSum');
		const prodArr = form.get('productArr');
		return { priceSum, prodArr };
	},

	validateCheckout: async ({ request }) => {
			
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
