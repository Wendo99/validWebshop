import { getUserStatus } from '$lib/server/authService';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ resolve, event }) => {
	event.locals.userData = await getUserStatus(event);

	const response = await resolve(event);
	return response;
};
