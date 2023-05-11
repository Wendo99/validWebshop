import type { Cookies } from '@sveltejs/kit';
import type { Product } from '../+page.server';

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
	return { userCart, productArray: prodArr };
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
		// cart.set(userEmail, userCart);
		// const hasUser = cart.has(userEmail);

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
