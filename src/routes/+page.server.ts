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

export async function load({ locals }) {
	const { data, error } = await locals.supaBase.from('products').select();
	const result = data as Product[];
	return { productArr_All: result };
}
