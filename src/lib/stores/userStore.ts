import { writable, type Writable } from 'svelte/store';

export const userUIDStore: Writable<string> = writable();
