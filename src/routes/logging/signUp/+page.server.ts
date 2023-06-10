import { fail, type Cookies } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerData } from './$types';

import invariant from 'tiny-invariant';
import { getBasket } from '$lib/server/cookieService';

interface RegisterData {
	email: string;
	password: string;
	confirm_password: string;
}

//TODO error handling
export const actions = {
	register: async ({ request, locals, cookies }) => {
		const formData = await request.formData();
		const registerValidation = await getRegisterValidationModel().safeParseAsync(formData);

		if (!registerValidation.success) {
			return fail(400, { error: registerValidation.error.flatten() });
		}

		const registerData: RegisterData = registerValidation.data;

		await signUpUserInSupaBase(locals, registerData, cookies);
		await addUserToDB(locals, registerData);

		if (registerValidation.success) {
			return registerData;
		}
	}
};

function getRegisterValidationModel() {
	const emailSchema = z.coerce.string().email({ message: 'Invalid email adress' });
	const stringSchema = z.coerce.string().min(6, { message: 'Length needs to be at least 6 character' });
	const registerValidationModel = zfd.formData({
		email: emailSchema,
		password: stringSchema,
		confirm_password: stringSchema
	});
	return registerValidationModel;
}

//TODO error handling
async function signUpUserInSupaBase(locals: App.Locals, registerData: RegisterData, cookies: Cookies) {
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
