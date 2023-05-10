import type { Cookies } from '@sveltejs/kit';
import type { Product } from '../+page.server';

const cart = new Map();

export async function load({ cookies, fetch }) {
	const result = getCookies(cookies);

	const prodArr: Product[] = [];

	for (let indexResult = 0, indexProdArray = 0; indexResult < result.length; indexResult++) {
		const id = result[indexResult];

		if (id) {
			const url = 'https://fakestoreapi.com/products/';
			const urlString = url + id;
			prodArr[indexProdArray] = await fetch(urlString).then(
				(res) => res.json() as unknown as Product
			);
			indexProdArray++;
		}
	}
	return { cartArr: result, productArray: prodArr };
}

function getCookies(cookies: Cookies) {
	const userCart = cookies.get('cart');
	let arr: number[] = [];
	if (userCart) {
		arr = JSON.parse(userCart);
	}
	return arr;
}

function getProductData() {}

export const actions = {
	addToCart: async ({ request, locals, cookies }) => {
		const form = await request.formData();
		const userEmail = locals.user?.email;

		const arr = getCookies(cookies);
		cart.set(userEmail, arr);

		const prodId = form.get('prodId') as string;
		const id: number = parseInt(prodId);
		const hasUser = cart.has(userEmail);

		if (!hasUser) {
			const userCart: number[] = [];
			userCart[id - 1] = 1;
			cart.set(userEmail, userCart);
			cookies.set('cart', JSON.stringify(userCart));
		} else {
			const tempUserCart: number[] = cart.get(userEmail);
			let amount = tempUserCart[id - 1];
			if (amount == null) {
				amount = 0;
			}
			tempUserCart[id - 1] = amount + 1;
			cart.set(userEmail, tempUserCart);
			cookies.set('cart', JSON.stringify(tempUserCart));
		}
	}
};
