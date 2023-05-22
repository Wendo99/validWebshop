import { writable } from 'svelte/store';

const map: Map<string, string> = new Map();

function createUserCartStore() {
    const { subscribe, set, update } = writable(map); 
	return { subscribe, update, set };
}

export const userBasketStore = createUserCartStore();