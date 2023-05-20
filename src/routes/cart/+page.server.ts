import { fail, type Cookies } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';
import invariant from 'tiny-invariant';
import { getUserCart } from '../../store/cookieStore';

export async function load({ cookies, locals }) {
	const userCart: Map<string, string> = (await getUserCart(cookies)).userCart;

	const prodArr: string[][] = [];

	let index = 0;
	for (const [key, value] of userCart) {
		const prodId = key;
		const productData: string[] = [];

		productData[0] = prodId;
		productData[1] = await getProdImgSrc(locals, parseInt(prodId));
		productData[2] = await getProdPrice(locals, parseFloat(prodId));
		productData[3] = await getProdTitle(locals, parseInt(prodId));
		productData[4] = value;
		prodArr[index++] = productData;
	}

	const piecesSum = getPiecesSum(prodArr);
	const priceSum = getPriceSum(prodArr);

	return { prodArr, piecesSum, priceSum };
}

async function getProdImgSrc(locals: App.Locals, prodId: number) {
	try {
		const { data, error } = await locals.supaBase.from('products').select('image').eq('id', prodId);
		if (data) {
			return data[0].image;
		}
	} catch (error) {
		console.error(error);
	}
}
async function getProdPrice(locals: App.Locals, prodId: number) {
	try {
		const { data, error } = await locals.supaBase.from('products').select('price').eq('id', prodId);
		if (data) {
			return data[0].price.toString();
		}
	} catch (error) {
		console.error(error);
	}
}
async function getProdTitle(locals: App.Locals, prodId: number) {
	try {
		const { data, error } = await locals.supaBase.from('products').select('title').eq('id', prodId);
		if (data) {
			return data[0].title.toString();
		}
	} catch (error) {
		console.error(error);
	}
}

export const actions = {
	addToCart: async ({ request, cookies }) => {

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
	const userCart: Map<string, string> = (await getUserCart(cookies)).userCart;
	if (userCart.has(prodId)) {
		const tmp = userCart.get(prodId);
		invariant(tmp != undefined, 'tmp is undefined');
		const newQty = (parseInt(tmp) + 1).toString();
		userCart.set(prodId, newQty);
	} else {
		userCart.set(prodId, '1');
	}
	const x = Object.fromEntries(userCart);
	cookies.set('cart', JSON.stringify(x));
}

function getPiecesSum(prodArr: string[][]): string {
	let result = 0;
	for (let index = 0; index < prodArr.length; index++) {
		const arr: string[] = prodArr[index];
		const qty = parseInt(arr[4]);
		result += qty;
	}
	return result.toString();
}

// TODO check if reduce() is possible within multiDimensional Arrays
function getPriceSum(prodArr: string[][]): string {
	let result = 0;
	for (let index = 0; index < prodArr.length; index++) {
		const arr: string[] = prodArr[index];
		const price = parseFloat(arr[2]);
		const qty = parseInt(arr[4]);
		result = result + price * qty;
	}
	return result.toString();
}
