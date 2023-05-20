import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';

//TODO error handling
export const actions = {
	logout: async ({ locals }) => {
		const { error } = await locals.supaBase.auth.signOut();
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

		const { data } = await locals.supaBase.auth.signUp({
			email: valid_FormData.data.email,
			password: valid_FormData.data.password
		});

		const { error } = await locals.supaBase.from('user_index').insert({
			user_eMail: valid_FormData.data.email
		});
		createUserCart(locals);

		if (valid_FormData.success) {
			return valid_FormData.data;
		}

	

	}
};

async function createUserCart(locals: App.Locals) {


	const { data  } = await locals.supaBase.from('user_index').select('user_id').eq('user_eMail', await locals.getSession().then((session) => {
		session?.user.email;
	}));
	const tempId = data?.map((item) => item.user_id) as unknown as number[];
	const { error } = await locals.supaBase.from('user_Carts').insert({ user_Id: tempId[0] });
	console.log(tempId[0]);
	console.log(error?.message);
}
