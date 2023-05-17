export async function load({ locals: {getSession} }) {
	const session = await getSession()

	return { user_eMail: session?.user.email };
}
