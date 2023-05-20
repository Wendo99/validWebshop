import type { Cookies } from '@sveltejs/kit';
import { readable } from 'svelte/store';

export async function getUserCart(cookies: Cookies, userEmail: string) {
	const { subscribe } = readable(0);

	return { userCart: await getUserCookie(cookies, userEmail), subscribe };
}

async function getUserCookie(cookies: Cookies, userEmail: string) {
	const hasUserCart: boolean = await checkUserCookie(cookies, userEmail);
	let userCart: Map<string, string>;

	if (hasUserCart) {
		userCart = await importUserCookie(cookies, userEmail);
	} else {
		userCart = new Map();
	}
	return userCart;
}

async function checkUserCookie(cookies: Cookies, userEmail: string): Promise<boolean> {
	return cookies.get(userEmail) ? true : false;
}

async function importUserCookie(cookies: Cookies, userEmail: string): Promise<Map<string, string>> {
	const jSonObj = cookies.get(userEmail);
	let userCart: Map<string, string> = new Map();
	if (jSonObj) {
		const temp = JSON.parse(jSonObj);
		userCart = new Map(Object.entries(temp));
	}
	return userCart;
}
