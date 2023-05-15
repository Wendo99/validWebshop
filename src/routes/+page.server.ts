import type { Load } from '@sveltejs/kit';

export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: Rating;
}

export interface Rating {
	rate: number;
	count: number;
}

export async function load({ fetch, locals }) {
	const productresult = await fetch('https://fakestoreapi.com/products').then(
		(res) => res.json() as unknown as Product[]
	);
	console.log(productresult);

	const {error} =  ((await locals.supaBase().from('products').insert(productresult)));

console.log(error)
	return { products: productresult };
}
