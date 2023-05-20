import type { Cookies } from '@sveltejs/kit';
import { readable } from 'svelte/store';

export async function getUserCart(cookies: Cookies) {
	const { subscribe } = readable(0);

	return { userCart: await getUserCookie(cookies),  subscribe };
}

async function getUserCookie(cookies: Cookies) {
	const hasUserCart: boolean = await checkUserCookie(cookies);
	let userCart: Map<string, string>;

	if (hasUserCart) {
		userCart = await importUserCookie(cookies);
	} else {
		userCart = new Map();
	}
	return userCart;
}

async function checkUserCookie(cookies: Cookies): Promise<boolean> {
	return cookies.get('cart') ? true : false;
}

async function importUserCookie(cookies: Cookies): Promise<Map<string, string>> {
	const jSonObj = cookies.get('cart');
	let userCart: Map<string, string> = new Map();
	if (jSonObj) {
		const temp = JSON.parse(jSonObj);
		userCart = new Map(Object.entries(temp));
	}
	return userCart;
}
