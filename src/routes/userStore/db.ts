import { v4 as uuid4 } from 'uuid';
import { create, find } from '.';

export const getUserByEmail = async (email:FormDataEntryValue|null) => {
	const existingUser = find({ email: email });
	if (!existingUser) {
		return Promise.resolve(null);
	}
	return Promise.resolve(existingUser);
};

export const getUserById = async (id) => {
	const existingUser = find({ id: id });
	if (!existingUser) {
		return Promise.resolve(null);
	}
	return Promise.resolve(existingUser);
};
