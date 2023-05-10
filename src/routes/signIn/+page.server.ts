import { fail, redirect } from '@sveltejs/kit';
import { getUserByEmail } from '../userStore/db.js';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		const value = await getUserByEmail(email);

		if (value == null) {
			return fail(400, { message: 'Login failed' });
		}

		if (value.password != password) {
			return fail(400, { message: 'Login failed' });
		}

		cookies.set('userEmail', email.toString());
		throw redirect(303, '/');
	}
	// logout:async ({request,cookies}) => {
	//     // TODO
	// },
	// register: async ({request, cookies}) => {
	//     // TODO
	// }
};
