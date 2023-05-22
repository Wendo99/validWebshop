import { fail } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';
import { getUserCart } from '$lib/stores/cookieStore';
import { productData } from '$lib/stores/productArrStore';

//TODO MAYBE merge functionality of pieceSum,priceSum,productArray, usercart with load func of +page.server.ts
export async function load({ cookies, locals }) {
	const session = await locals.getSession();
	const userId = await getUserId(locals, session).then((res) => res.data.user_id);
	const tmp = await locals.getSession().then((res) => res?.user.email);
	let email = '';
	if (tmp != undefined) {
		email = tmp;
	}
	const userAdress = await getUserAdress(locals, userId).then((res) => res.data);
	const userCart: Map<string, string> = (await getUserCart(cookies, email)).userCart;
	const priceSum = (await productData(locals, userCart)).priceSum;

	return { userCart, priceSum, userAdress };
}

export const actions = {
	validateCheckout: async ({ request, locals: { getSession }, locals }) => {
		const formData = await request.formData();
		const minAge = 18;
		const actualDate = new Date();
		const minYear: number = actualDate.getFullYear() - minAge;

		const paymentEnum = z.enum(['creditCard', 'payPal', 'bankPayment']);
		type paymentEnum = z.infer<typeof paymentEnum>;

		const deliveryEnum = z.enum(['delivery_Home', 'delivery_DHLBox']);
		type deliveryEnum = z.infer<typeof deliveryEnum>;

		const x = z.coerce.date();

		//TODO validation error messages
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

		const result = await validation_CheckoutModel.safeParseAsync(formData);

		if (!result.success) {
			// war wohl nix :(
			return fail(400, { error: result.error.flatten() });
		}

		const session = await getSession();
		const userId = await getUserId(locals, session).then((res) => res.data.user_id);

		// TODO error handling
		async function createUserAdressRow(locals: any) {
			const { error } = await locals.supaBase.from('user_Adress').upsert([{ user_id: userId }]);

			return { error };
		}
		createUserAdressRow(locals);

		async function sendUserData(result: any, locals: any) {
			const { error } = await locals.supaBase
				.from('user_Adress')
				.update(result.data)
				.eq('user_id', userId);
		}

		sendUserData(result, locals);

		return result.data;
	}
};

async function getUserId(locals: any, session: any) {
	const { data, error } = await locals.supaBase
		.from('user_index')
		.select('user_id')
		.eq('user_eMail', session?.user.email)
		.single();
	return { data };
}

async function getUserAdress(locals: App.Locals, userId: number) {
	const { data, error } = await locals.supaBase
		.from('user_Adress')
		.select()
		.eq('user_id', userId)
		.single();
	return { data: data };
}
