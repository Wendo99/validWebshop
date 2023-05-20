import { fail, type Cookies, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';
import invariant from 'tiny-invariant';
import { getUserCart } from '../../store/cookieStore';
import { productData } from '../../store/productArrStore';

export async function load({ cookies, locals }) {
	const tmp = await locals.getSession().then((res) => res?.user.email);
	let email = '';
	if (tmp != undefined) {
		email = tmp;
	}

	const userCart: Map<string, string> = (await getUserCart(cookies, email)).userCart;
	const pD = await productData(locals, userCart);
	console.log(userCart);
	const prodArr: string[][] = pD.prodArr;

	const piecesSum = pD.piecesSum;
	const priceSum = pD.priceSum;

	return { prodArr, piecesSum, priceSum };
}

export const actions = {
	addToCart: async ({ request, cookies, locals }) => {
		const tmp = await locals.getSession().then((res) => res?.user.email);
		let email = '';
		if (tmp != undefined) {
			email = tmp;
		}

		//TODO formValidation
		const formData = await request.formData();
		const validationAddToCart = zfd.formData({
			prodId: zfd.numeric()
		});
		const result = await validationAddToCart.safeParseAsync(formData);
		if (!result.success) {
			// war wohl nix :(
			return fail(400, { error: result.error.flatten() });
		}

		const prodId: string = result.data.prodId.toString();
		putItemInCart(cookies, prodId, email);
	}
};

async function putItemInCart(cookies: Cookies, prodId: string, email: string) {
	const userCart: Map<string, string> = (await getUserCart(cookies, email)).userCart;
	if (userCart.has(prodId)) {
		const tmp = userCart.get(prodId);
		invariant(tmp != undefined, 'tmp is undefined');
		const newQty = (parseInt(tmp) + 1).toString();
		userCart.set(prodId, newQty);
	} else {
		userCart.set(prodId, '1');
	}
	const x = Object.fromEntries(userCart);
	cookies.set(email, JSON.stringify(x));
}