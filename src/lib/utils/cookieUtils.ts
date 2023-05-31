import type { Cookies } from '@sveltejs/kit';
import { readable } from 'svelte/store';

export async function getUserCart(cookies: Cookies, uuid: string) {
	const { subscribe } = readable(0);
	return { userCart: await getUserCookie(cookies, uuid), subscribe };
}

async function getUserCookie(cookies: Cookies, uuid: string) {
	const hasUserCart: boolean = await checkUserCookie(cookies, uuid);
	let userCart: Map<string, string>;
	if (hasUserCart) {
		userCart = await importUserCookie(cookies, uuid);
	} else {
		userCart = new Map();
	}
	return userCart;
}

async function checkUserCookie(cookies: Cookies, uuid: string): Promise<boolean> {
	return cookies.get(uuid) == undefined ? false : true;
}

async function importUserCookie(cookies: Cookies, uuid: string): Promise<Map<string, string>> {
	const jSonObj = cookies.get(uuid);
	let userCart: Map<string, string> = new Map();
	if (jSonObj) {
		const temp = JSON.parse(jSonObj);
		userCart = new Map(Object.entries(temp));
	}
	return userCart;
}