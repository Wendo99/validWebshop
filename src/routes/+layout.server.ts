import { checkAuthentification } from '$lib/server/authService';
import { getBasket } from '$lib/server/cookieService';
import { getUserEmail } from '$lib/server/userDataService';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const userBasket = getBasket(locals, cookies);

	if (checkAuthentification(locals)) {
		return { userEmail: getUserEmail(locals), userBasket };
	} else {
		return { userEmail: null, userBasket };
	}
};
