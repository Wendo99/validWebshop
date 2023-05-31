// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { zfd } from 'zod-form-data';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';

export const actions = {
	sendMessage: async ({ request, locals }) => {
		const formData = await request.formData();

		const emailSchema = z.coerce.string().email({ message: 'Invalid email adress' });
		const stringSchema = z.coerce.string();

		const validationContactMessage = zfd.formData({
			name: stringSchema,
			email: emailSchema
		});

		const validContactData = await validationContactMessage.safeParseAsync(formData);

		if (!validContactData.success) {
			return fail(400, { error: validContactData.error.flatten() });
		}

		// XXX immer notwendig?
		return { success: true };
	}
};
