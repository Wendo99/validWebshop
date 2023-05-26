import { fail, type Cookies } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';
import invariant from 'tiny-invariant';
import { getUserCart } from '$lib/stores/cookieStore';
import { productData } from '$lib/stores/productArrStore';
import { userBasketStore } from '$lib/stores/userBasketStore';
import { userUIDStore } from '$lib/stores/userStore';

export async function load({ cookies, locals }) {
	const tmp = await locals.getSession().then((res) => res?.user.id);
	let uuid = '';
	if (tmp != undefined) {
		uuid = tmp;
	}
	const userCart: Map<string, string> = (await getUserCart(cookies, uuid)).userCart;
	const pD = await productData(locals, userCart);
	const prodArr: string[][] = pD.prodArr;
	const piecesSum = pD.piecesSum;
	const priceSum = pD.priceSum;

	return { prodArr, piecesSum, priceSum };
}

export const actions = {
	addToCart: async ({ request, cookies, locals }) => {
		const tmp = await locals.getSession().then((res) => res?.user.id);
		let id = '';
		if (tmp != undefined) {
			id = tmp;
		}
		console.log(id);
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

		putItemInCart(cookies, prodId);
	}
};

async function putItemInCart(cookies: Cookies, prodId: string) {
	let uuid = '';
	const tmp = userUIDStore.subscribe((value) => {
		uuid = value;
	});
	const userCart: Map<string, string> = (await getUserCart(cookies, uuid)).userCart;
	if (userCart.has(prodId)) {
		const tmp = userCart.get(prodId);
		invariant(tmp != undefined, 'tmp is undefined');
		const newQty = (parseInt(tmp) + 1).toString();
		userCart.set(prodId, newQty);
	} else {
		userCart.set(prodId, '1');
	}
	userBasketStore.update((userCart) => userCart);
	const x = Object.fromEntries(userCart);
	cookies.set(uuid, JSON.stringify(x));
}
