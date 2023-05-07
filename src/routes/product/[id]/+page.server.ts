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

export async function load({ params, fetch }) {
	const id = params.id;
	console.log(id);
	const url = 'https://fakestoreapi.com/products/';
	const urlString = url + id;
	console.log(urlString);

	const	 productResult = await fetch(urlString).then((res) => res.json() as unknown as Product);

	return { product: productResult };
}
