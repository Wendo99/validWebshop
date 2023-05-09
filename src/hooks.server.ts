import { getUserByEmail } from './routes/userStore/db';

export const handle = async ({ resolve, event }) => {
	console.log('hu');
	event.locals.test = 'hallo';

	const sID = event.cookies.get('sessionId');
	if (sID) {
		const userData = await getUserByEmail(sID);
		if (userData) {
			event.locals.user = userData;
		}
	}

	return await resolve(event);
};
