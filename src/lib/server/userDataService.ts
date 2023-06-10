import invariant from 'tiny-invariant';

export function getUserEmail(locals: App.Locals): string {
	invariant(locals.userData != null, 'userData is null');
	invariant(locals.userData.email != undefined, 'userEmail is undefined');

	return locals.userData.email;
}

export function getUuid(locals: App.Locals): string {
	invariant(locals.userData != null, 'userData is null');

	return locals.userData.uuid;
}
