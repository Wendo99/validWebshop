import { derived } from 'svelte/store';
import { userBasketStore } from './userBasketStore';

export const itemsQty = getQty();

function getQty() {
	return derived(userBasketStore, ($userBasketStore) => {
		let tmp = 0;
		$userBasketStore.forEach((value) => {
			tmp += parseInt(value);
		});
		return tmp;
	});
}
