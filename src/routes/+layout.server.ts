// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';
import { getUserCart } from '../lib/stores/cookieStore';

export async function load({ locals: { getSession }, cookies }) {
	const session = await getSession();
	const email = session?.user.email;
	let userCart: Map<string, string> = new Map();

	if (email) {
		const tmp = (await getUserCart(cookies, email)).userCart;
		if (tmp != undefined) {
			userCart = tmp;
		}
	}
	return { user_eMail: email, userCart };
}