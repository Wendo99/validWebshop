// See https://kit.svelte.dev/docs/types#app
import { createClient } from '@supabase/supabase-js';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			supaBase: ReturnType<typeof createClient<any, 'public', any>>;
			userData: { uuid: string = ''; email: string | undefined = '' } | null;
		}
	}
}
export {};
