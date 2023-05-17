// See https://kit.svelte.dev/docs/types#app
import type { User } from './routes/userStore';
import { createClient, type Session } from '@supabase/supabase-js';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supaBase: ReturnType<typeof createClient<any, 'public', any>>;
			getSession: () => Promise<Session | null>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
