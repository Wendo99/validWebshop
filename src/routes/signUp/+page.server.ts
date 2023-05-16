import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const actions = {
	logout: async ({ locals }) => {
		const { error } = await locals.supaBase().auth.signOut();
	},
	register: async ({ request, locals }) => {
		const form_Data = await request.formData();

		const emailSchema = z.coerce.string().email({ message: 'Invalid email adress' });
		const stringSchema = z.coerce
			.string()
			.min(8, { message: 'Length needs to be at least 8 character' });

		const register_DataModel = zfd.formData({
			email: emailSchema,
			password: stringSchema,
			confirm_password: stringSchema
		});

		const valid_FormData = await register_DataModel.safeParseAsync(form_Data);

		if (!valid_FormData.success) {
			// war wohl nix :(
			return fail(400, { error: valid_FormData.error.flatten() });
		}

		const { data, error } = await locals
			.supaBase()
			.auth.signUp({ email: valid_FormData.data.email, password: valid_FormData.data.password });

		locals.user_email = valid_FormData.data.email;

		if (valid_FormData.success) {
			return valid_FormData.data;
		}
	}
};
