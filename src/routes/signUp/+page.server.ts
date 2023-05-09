export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');
	}
	// logout: async ({ request, cookies }) => {
	// 	// TODO
	// },
	// register: async ({ request, cookies }) => {
	// 	// TODO
	// }
}
