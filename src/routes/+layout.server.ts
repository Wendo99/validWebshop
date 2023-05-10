export async function load({ locals }) {
	return { userMail: locals.user?.email };
}
