// See https://kit.svelte.dev/docs/types#app

import type { User } from "./routes/userStore";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			test: string;
			user: User|undefined;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
