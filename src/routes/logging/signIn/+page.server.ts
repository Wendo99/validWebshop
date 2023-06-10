import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';

//TODO error handling
export const actions = {
	login: async ({ request, locals, url }) => {
		const formData = await request.formData();

		const emailSchema = z.coerce.string().email({ message: 'Invalid email adress' });
		const stringSchema = z.coerce.string();

		const login_DataModel = zfd.formData({
			email: emailSchema,
			password: stringSchema,
			returnTo: stringSchema.optional()
		});

		const valid_FormData = await login_DataModel.safeParseAsync(formData);

		if (!valid_FormData.success) {
			// war wohl nix :(
			return fail(400, { error: valid_FormData.error.flatten() });
		}

		const { data, error } = await locals.supaBase.auth.signInWithPassword({
			email: valid_FormData.data.email,
			password: valid_FormData.data.password
		});
		if (error) {
			error.message = 'Login failed - either email or password is wrong';
			console.error(error);
			return { errorMessage: error.message };
		}
		throw redirect(303, valid_FormData.data.returnTo || '/');
	},
	logout: async ({ locals }) => {
		const { error } = await locals.supaBase.auth.signOut();
		if (error) {
			console.error(error);
		}
	}
};
