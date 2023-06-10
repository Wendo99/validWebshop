import type { Cookies } from '@sveltejs/kit';
import invariant from 'tiny-invariant';
import { checkAuthentification } from './authService';
import { getUuid } from './userDataService';

export function getBasket(locals: App.Locals, cookies: Cookies) {
	const isAuthenticated: boolean = checkAuthentification(locals);

	if (isAuthenticated) {
		const uuid = getUuid(locals);
		return getUserBasket(cookies, uuid);
	} else {
		return getUserBasket(cookies, 'guest');
	}
}

function getUserBasket(cookies: Cookies, uuid: string) {
	const hasCookie: boolean = checkCookieExists(cookies, uuid);
	if (hasCookie) {
		return convertJsonToMap(cookies, uuid);
	} else {
		return new Map<string, string>();
	}
}

function checkCookieExists(cookies: Cookies, uuid: string): boolean {
	return cookies.get(uuid) != undefined ? true : false;
}

function convertJsonToMap(cookies: Cookies, uuid: string): Map<string, string> {
	const jSonObj = cookies.get(uuid);
	invariant(jSonObj != undefined, 'jSonObj is undefined');
	return new Map(Object.entries(JSON.parse(jSonObj)));
}

export function updateCookie(cookies: Cookies, uuid: string, userBasket: Map<string, string>) {
	cookies.set(uuid, JSON.stringify(Object.fromEntries(userBasket)), {
		path: '/',
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});
}

export function deleteCookie(cookies: Cookies, uuid: string) {
	cookies.delete(uuid);
}
