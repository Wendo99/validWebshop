import { fail, type Cookies } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';
import invariant from 'tiny-invariant';
import { productData } from '$lib/utils/productUserUtils';
import { userBasketStore } from '$lib/stores/userBasketStore';
import { checkAuthentification } from '$lib/server/authService';
import { getBasket, updateCookie } from '$lib/server/cookieService';
import { getUuid } from '$lib/server/userDataService';

export async function load({ cookies, locals }) {
	const isAuthentificated: boolean = checkAuthentification(locals);

	const prodData = await productData(locals, getBasket(locals, cookies));
	const prodArr: string[][] = prodData.prodArr;
	const piecesSum = prodData.piecesSum;
	const priceSum = prodData.priceSum;

	return { prodArr, piecesSum, priceSum, isAuthentificated };
}

export const actions = {
	addToCart: async ({ request, cookies, locals }) => {
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

		putItemInCart(cookies, prodId, locals);
	}
};

async function putItemInCart(cookies: Cookies, prodId: string, locals: App.Locals) {
	const userBasket: Map<string, string> = getBasket(locals, cookies);
	if (userBasket.has(prodId)) {
		const tmp = userBasket.get(prodId);
		invariant(tmp != undefined, 'tmp is undefined');
		const newQty = (parseInt(tmp) + 1).toString();
		userBasket.set(prodId, newQty);
	} else {
		userBasket.set(prodId, '1');
	}
	userBasketStore.update((userCart) => userCart);
	let uuid = '';

	if (locals.userData) {
		uuid = getUuid(locals);
	} else {
		uuid = 'guest';
	}

	updateCookie(cookies, uuid, userBasket);
}
