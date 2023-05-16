// See https://kit.svelte.dev/docs/types#app
import type { User } from './routes/userStore';
import { createClient } from '@supabase/supabase-js';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | undefined;
			supaBase: () => ReturnType<typeof createClient<any, 'public', any>> ;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
