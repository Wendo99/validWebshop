import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';

//TODO error handling
export const actions = {
	login: async ({ request, locals }) => {
		const form_Data = await request.formData();

		const emailSchema = z.coerce.string().email({ message: 'Invalid email adress' });
		const stringSchema = z.coerce.string();

		const login_DataModel = zfd.formData({
			email: emailSchema,
			password: stringSchema
		});

		const valid_FormData = await login_DataModel.safeParseAsync(form_Data);

		if (!valid_FormData.success) {
			// war wohl nix :(
			return fail(400, { error: valid_FormData.error.flatten() });
		}

		const { data, error } = await locals.supaBase.auth.signInWithPassword({
			email: valid_FormData.data.email,
			password: valid_FormData.data.password
		});

		return valid_FormData.data;
	},
	logout: async ( {locals} ) => {
		console.log(1)
		const { error } = await locals.supaBase.auth.signOut();
	}
};
