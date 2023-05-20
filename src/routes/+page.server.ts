// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
	qty?: number;
}

//TODO error handling
export async function load({ locals}) {
	const { data, error } = await locals.supaBase.from('products').select();
	const result = data as Product[];
	return { productArr_All: result };
}
