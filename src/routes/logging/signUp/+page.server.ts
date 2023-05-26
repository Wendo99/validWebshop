import { fail, type Cookies } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerData } from './$types';
import { userUIDStore } from '$lib/stores/userStore';
import { getUserCart } from '$lib/stores/cookieStore';
import invariant from 'tiny-invariant';

interface RegisterData {
	email: string;
	password: string;
	confirm_password: string;
}

//TODO error handling
export const actions = {
	register: async ({ request, locals, cookies }) => {
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

		await signUpUserInSupaBase(locals, registerData, cookies);

		await addUserToDB(locals, registerData);

		//XXX return userdata really good idea ??
		if (validateRegisterModel.success) {
			return registerData;
		}
	}
};

//TODO error handling
async function signUpUserInSupaBase(
	locals: App.Locals,
	registerData: RegisterData,
	cookies: Cookies
) {
	let uuid = '';
	const tmp = userUIDStore.subscribe((value) => {
		uuid = value;
	});
	const userCart = (await getUserCart(cookies, uuid)).userCart;
	cookies.delete(uuid);
	const { data, error } = await locals.supaBase.auth.signUp({
		email: registerData.email,
		password: registerData.password
	});
	if (error != null) {
		console.log(error);
	}
	const x = Object.fromEntries(userCart);
	invariant(data.user?.id, 'no user id');
	cookies.set(data.user?.id, JSON.stringify(x));
	userUIDStore.set(data.user.id);
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
