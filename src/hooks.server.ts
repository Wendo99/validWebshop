import { getUserByEmail } from './routes/userStore/db';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

let client: ReturnType<typeof createClient<any, 'public', any>> | null = null;

export const authentication: Handle = async ({ resolve, event }) => {
	const sID = event.cookies.get('userEmail');
	if (sID) {
		const userData = await getUserByEmail(sID);
		if (userData) {
			event.locals.user = userData;
		}
	}
	return await resolve(event);
};

export const supabase: Handle = async ({ resolve, event }) => {
	event.locals.supaBase = () => {
		if (!client) {
			client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
		}
		return client;
	};
	return await resolve(event);
};

export const handle = sequence(authentication, supabase);
