export async function load({ locals }) {
	return { username: locals.user?.email };
}
