import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';

interface RegisterData {
	email: string;
	password: string;
	confirm_password: string;
}

//TODO error handling
export const actions = {
	register: async ({ request, locals }) => {
		const formData = await request.formData();

		//  Zod model
		const emailSchema = z.coerce.string().email({ message: 'Invalid email adress' });
		const stringSchema = z.coerce
			.string()
			.min(6, { message: 'Length needs to be at least 6 character' });
		const registerModel = zfd.formData({
			email: emailSchema,
			password: stringSchema,
			confirm_password: stringSchema
		});

		const validateRegisterModel = await registerModel.safeParseAsync(formData);

		if (!validateRegisterModel.success) {
			// war wohl nix :(
			return fail(400, { error: validateRegisterModel.error.flatten() });
		}
		const registerData: RegisterData = validateRegisterModel.data;

		await signUpUserInSupaBase(locals, registerData);

		await addUserToDB(locals, registerData);

		//XXX return userdata really good idea ??
		if (validateRegisterModel.success) {
			return registerData;
		}
	}
};

//TODO error handling
async function signUpUserInSupaBase(locals: App.Locals, registerData: RegisterData) {
	const { data, error } = await locals.supaBase.auth.signUp({
		email: registerData.email,
		password: registerData.password
	});
	if (error != null) {
		console.log(error);
	}
}

//TODO error handling
async function addUserToDB(locals: App.Locals, registerData: RegisterData) {
	const { error } = await locals.supaBase.from('user_index').insert({
		user_eMail: registerData.email
	});
	if (error != null) {
		console.log(error);
	}
}
