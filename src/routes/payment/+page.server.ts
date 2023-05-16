import { fail, type Cookies} from '@sveltejs/kit';
import type { Product } from '../+page.server';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

//TODO MAYBE merge functionality of pieceSum,priceSum,productArray, usercart with load func of +page.server.ts
export async function load({ cookies, fetch }) {
	const userCart: number[] = getUserCart(cookies);
	const prodArr: Product[] = [];

	for (let indexUserCart = 0, indexProdArr = 0; indexUserCart < userCart.length; indexUserCart++) {
		const id = indexUserCart;
		if (userCart[id] != null) {
			const url = 'https://fakestoreapi.com/products/';
			const urlString = url + (id + 1);
			const result = await fetch(urlString).then((res) => res.json() as unknown as Product);
			prodArr[indexProdArr] = result;
			indexProdArr++;
		}
	}
	const piecesSum = getPiecesSum(userCart);
	const priceSum = getPriceSum(prodArr, userCart);

	return { userCart, productArray: prodArr, piecesSum, priceSum };
}
export const actions = {
	paymentProcessing: async ({ request }) => {
		const form = await request.formData();
		const priceSum = form.get('priceSum');
		const prodArr = form.get('productArr');
		return { priceSum, prodArr };
	},

	validateCheckout: async ({ request,locals }) => {
		const form_Data = await request.formData();
		const minAge = 18;
		const actualDate = new Date();
		const minYear: number = actualDate.getFullYear() - minAge;

		const paymentEnum = z.enum(['creditcard', 'payPal', 'bankPayment']);
		type paymentEnum = z.infer<typeof paymentEnum>;

		const deliveryEnum = z.enum(['delivery_Home', 'delivery_DHLBox']);
		type deliveryEnum = z.infer<typeof deliveryEnum>;

		const x = z.coerce.date();

		const validation_CheckoutModel = zfd.formData({
			user_firstName: zfd.text(),
			user_lastName: zfd.text(),
			user_street: zfd.text(),
			user_houseNumber: z.preprocess(
				(a) => parseInt(z.string().parse(a), 10),
				z.number().positive('The housenumber needs to be postitive')
			),
			user_city: zfd.text(),
			user_postcode: z.preprocess(
				(a) => parseInt(z.string().parse(a), 10),
				z.number().positive('The postcode needs to be postitive')
			),
			user_birthday: z.preprocess(
				(d) => x.parse(d),
				z.date().max(new Date(minYear, actualDate.getMonth(), actualDate.getDate()), {
					message: 'Minimum age is 18'
				})
			),
			user_pref_payment: paymentEnum,
			user_pref_delivery: deliveryEnum
		});

		const result = await validation_CheckoutModel.safeParseAsync(form_Data);


		if (!result.success) {
			// war wohl nix :(
			return fail(400, { error: result.error.flatten() });
		}

		const {error}= await locals.supaBase().from('userDatabase').update(result.data).eq('id',1);

		return result.data;
	}
};

function getUserCart(cookies: Cookies): number[] {
	const jSonObj = cookies.get('cart');
	let userCart: number[] = [];
	if (jSonObj) {
		userCart = JSON.parse(jSonObj);
	}
	return userCart;
}

function getPiecesSum(userCart: number[]): number {
	let result = 0;
	const sum = userCart.reduce((accum, current) => accum + current, result);
	return (result = sum);
}

// TODO check if reduce() is possible within multiDimensional Arrays
function getPriceSum(productArray: Product[], userCart: number[]): number {
	let result = 0;
	const tempArray: Product[] = productArray;
	for (let dataProdArrIndex = 0; dataProdArrIndex < tempArray.length; dataProdArrIndex++) {
		const productPrice = tempArray[dataProdArrIndex].price;
		const qty = userCart[tempArray[dataProdArrIndex].id - 1];
		result = result + productPrice * qty;
	}
	return result;
}
