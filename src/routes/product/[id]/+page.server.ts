// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rate: number;
	count: number;
}

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
