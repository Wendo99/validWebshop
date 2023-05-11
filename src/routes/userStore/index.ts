import { writable, get } from 'svelte/store';

export const user = writable([{ id: 123, email: 'test@example.com', password: 'secret' }]);
export type User = { id: number; email: string; password: string };

export const create = (newUser) => {
	const userExists = find({ email: newUser.email });
	if (userExists) {
		return false;
	}
	user.update((u) => [...u, newUser]);
	return newUser;
};

export const remove = (id: number) => {
	user.update((u) => u.filter((u) => u.id !== id));
};

export const find = (obj) => {
	let existingUser;
	const value = get(user);

	if (obj.email) {
		existingUser = value.find((item) => item.email === obj.email);
	} else {
		existingUser = value.find((item) => item.id === obj.id);
	}

	return existingUser;
};
