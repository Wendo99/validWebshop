// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';

export async function load({ locals: { getSession } }) {
	const session = await getSession();
	return { user_eMail: session?.user.email };
}
