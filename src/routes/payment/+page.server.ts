import { fail } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';
import { getUserCart } from '../../store/cookieStore';
import { productData } from '../../store/productArrStore';
import { xlink_attr } from 'svelte/internal';
import { get } from 'svelte/store';

//TODO MAYBE merge functionality of pieceSum,priceSum,productArray, usercart with load func of +page.server.ts
export async function load({ cookies, locals }) {
	const userCart: Map<string, string> = (await getUserCart(cookies)).userCart;
	const priceSum = (await productData(locals, userCart)).priceSum;

	return { userCart, priceSum };
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

		const validation_CheckoutModel = zfd.formData({
			user_firstName: zfd.text()
			// user_lastName: zfd.text(),
			// user_street: zfd.text(),
			// user_houseNumber: z.preprocess(
			// 	(a) => parseInt(z.string().parse(a), 10),
			// 	z.number().positive('The housenumber needs to be postitive')
			// ),
			// user_city: zfd.text(),
			// user_postcode: z.preprocess(
			// 	(a) => parseInt(z.string().parse(a), 10),
			// 	z.number().positive('The postcode needs to be postitive')
			// ),
			// user_birthday: z.preprocess(
			// 	(d) => x.parse(d),
			// 	z.date().max(new Date(minYear, actualDate.getMonth(), actualDate.getDate()), {
			// 		message: 'Minimum age is 18'
			// 	})
			// ),
			// user_pref_payment: paymentEnum,
			// user_pref_delivery: deliveryEnum
		});

		const result = await validation_CheckoutModel.safeParseAsync(formData);

		if (!result.success) {
			// war wohl nix :(
			return fail(400, { error: result.error.flatten() });
		}

		const session = await getSession();

		async function getUserId(locals: any, session: any) {
			const { data, error } = await locals.supaBase
				.from('user_index')
				.select('user_id')
				.eq('user_eMail', session?.user.email);

			return { data };
		}
		const data = (await getUserId(locals, session)).data.pop();

		// TODO error handling
		async function createUserAdressRow(locals: any) {
			const { error } = await locals.supaBase
				.from('user_Adress')
				.upsert([{ user_id: data.user_id }]);

			return { error };
		}
		createUserAdressRow(locals);

		async function sendUserData(result: any, locals: any) {
			const { error } = await locals.supaBase
				.from('user_Adress')
				.update(result.data)
				.eq('user_id', data.user_id);
		}

		sendUserData(result, locals);

		return result.data;
	}
};
