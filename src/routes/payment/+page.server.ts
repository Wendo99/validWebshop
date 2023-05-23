import { fail, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';
import { getUserCart } from '$lib/stores/cookieStore';
import { productData } from '$lib/stores/productArrStore';

const paymentEnum = z.enum(['creditCard', 'payPal', 'bankPayment']);
type paymentEnum = z.infer<typeof paymentEnum>;

const deliveryEnum = z.enum(['delivery_Home', 'delivery_DHLBox']);
type deliveryEnum = z.infer<typeof deliveryEnum>;

interface CheckoutData {
	user_firstName: string;
	user_lastName: string;
	user_street: string;
	user_houseNumber: number;
	user_city: string;
	user_postcode: number;
	user_birthday: Date;
	user_pref_payment: paymentEnum;
	user_pref_delivery: deliveryEnum;
}

//TODO MAYBE merge functionality of pieceSum,priceSum,productArray, usercart with load func of +page.server.ts
export async function load({ cookies, locals }) {
	const session = await locals.getSession();
	let userEmail = '';
	if (session && session.user.email) {
		userEmail = session.user.email;
	}
	const userId = await getUserId(locals, userEmail).then((res) => res);

	const userAdress = await getUserAdress(locals, userId).then((res) => res);

	const userCart: Map<string, string> = (await getUserCart(cookies, userEmail)).userCart;

	const priceSum = (await productData(locals, userCart)).priceSum;

	return { userCart, priceSum, userAdress };
}

export const actions = {
	validateCheckout: async ({ request, locals: { getSession }, locals, cookies }) => {
		const formData = await request.formData();
		const minAge = 18;
		const actualDate = new Date();
		const minYear: number = actualDate.getFullYear() - minAge;

		const x = z.coerce.date();

		//TODO validation error messages
		const checkoutModel = zfd.formData({
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

		const validateCheckOutData = await checkoutModel.safeParseAsync(formData);

		if (!validateCheckOutData.success) {
			// war wohl nix :(
			return fail(400, { error: validateCheckOutData.error.flatten() });
		}
		const checkoutData: CheckoutData = validateCheckOutData.data;

		const session = await getSession();
		let userEmail = '';
		if (session && session.user.email) {
			userEmail = session.user.email;
		}

		const userId: number = await getUserId(locals, userEmail).then((res) => res);

		createUserAdressRow(locals, userId);
		sendUserData(checkoutData, locals, userId);

		cookies.delete(userEmail);
		throw redirect(303, '/payment/paymentSuccess/');
	}
};

// TODO error handling
async function createUserAdressRow(locals: App.Locals, userId: number) {
	const { error } = await locals.supaBase.from('user_Adress').upsert([{ user_id: userId }]);
	if (error != null) {
		console.error(error);
	}
}

async function sendUserData(checkoutData: CheckoutData, locals: App.Locals, userId: number) {
	const { error } = await locals.supaBase
		.from('user_Adress')
		.update(checkoutData)
		.eq('user_id', userId);
	if (error != null) {
		console.error(error);
	}
}

async function getUserId(locals: App.Locals, userEmail: string) {
	const { data, error } = await locals.supaBase
		.from('user_index')
		.select('user_id')
		.eq('user_eMail', userEmail)
		.single();
	if (error != null) {
		console.error(error);
	}
	if (data?.user_id) {
		return data.user_id;
	}
}

async function getUserAdress(locals: App.Locals, userId: number) {
	const { data, error } = await locals.supaBase
		.from('user_Adress')
		.select()
		.eq('user_id', userId)
		.single();
	if (error != null) {
		console.error(error);
	}
	if (data) {
		return data;
	}
}
