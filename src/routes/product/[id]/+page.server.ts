import { error } from '@sveltejs/kit';
import type { Product } from '../../+page.server';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PageServerLoad } from './$types';

//TODO error handling
export async function load({ params, locals }) {
	const id = params.id;
	const { data } = await locals.supaBase.from('products').select().eq('id', id).single();
	const result = data as unknown as Product | null;

	if (result == null) {
		throw error(404, { message: 'Product not found' });
	}

	return { product: result };
}
