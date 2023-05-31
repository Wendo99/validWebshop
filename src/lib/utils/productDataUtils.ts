import { readable } from 'svelte/store';

export async function prodDBInput(locals: App.Locals, prodId: number) {
	const { subscribe } = readable(0);

	return {
		prodImgSrc: await getProdImgSrc(locals, prodId),
		prodPrice: await getProdPrice(locals, prodId),
		prodTitle: await getProdTitle(locals, prodId),
		subscribe
	};
}

// TODO error handling
export async function getProdImgSrc(locals: App.Locals, prodId: number) {
	try {
		const { data, error } = await locals.supaBase.from('products').select('image').eq('id', prodId);
		if (data) {
			return data[0].image;
		}
	} catch (error) {
		console.error(error);
	}
}

export async function getProdPrice(locals: App.Locals, prodId: number) {
	try {
		const { data, error } = await locals.supaBase.from('products').select('price').eq('id', prodId);
		if (data) {
			return data[0].price.toString();
		}
	} catch (error) {
		console.error(error);
	}
}

export async function getProdTitle(locals: App.Locals, prodId: number) {
	try {
		const { data, error } = await locals.supaBase.from('products').select('title').eq('id', prodId);
		if (data) {
			return data[0].title.toString();
		}
	} catch (error) {
		console.error(error);
	}
}
