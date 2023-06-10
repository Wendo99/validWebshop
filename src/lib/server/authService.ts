import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import type { Session } from '@supabase/supabase-js';

export function checkAuthentification(locals: App.Locals): boolean {
	if (locals.userData) {
		return true;
	} else {
		return false;
	}
}

export const getUserStatus = async (event: RequestEvent<Partial<Record<string, string>>, string | null>) => {
	setSupaBaseClient(event);
	const session: Session | null = await getSupaBaseSession(event);
	if (session) {
		return {
			uuid: session.user.id,
			email: session.user.email
		};
	} else {
		return null;
	}
};

function setSupaBaseClient(event: RequestEvent<Partial<Record<string, string>>, string | null>) {
	event.locals.supaBase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});
}

async function getSupaBaseSession(event: RequestEvent<Partial<Record<string, string>>, string | null>) {
	const {
		data: { session }
	} = await event.locals.supaBase.auth.getSession();
	return session;
}
