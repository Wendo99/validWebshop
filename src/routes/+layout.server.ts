// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';
import { getUserCart } from '../lib/utils/cookieUtils';
import { v4 as uuidv4 } from 'uuid';
import { userUIDStore } from '$lib/stores/userUIDStore';

export async function load({ locals, cookies }) {
	const user = await locals.getSession().then((res) => res?.user);
	let uuid;
	if (user) {
		userUIDStore.set(user.id);
		uuid = user.id;
	} else {
		uuid = setupUserUUID();
	}

	let userCart: Map<string, string> = new Map();

	const tmp = (await getUserCart(cookies, uuid)).userCart;
	if (tmp != undefined) {
		userCart = tmp;
	}

	const email = user?.email;

	return { user_eMail: email, userCart };
}

function setupUserUUID() {
	let result: string | undefined;
	const temp = userUIDStore.subscribe((value) => (result = value));
	if (result == undefined) {
		result = getGuestUserUID();
		userUIDStore.set(result);
	}
	return result;
}

function getGuestUserUID(): string {
	const userUID: string = uuidv4();
	return userUID;
}
