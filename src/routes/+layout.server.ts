export async function load({ locals }) {
	const { data, error } = await locals.supaBase().auth.getSession();
	console.log(data.session?.user);
	return { user_eMail: locals.user_email };
}
