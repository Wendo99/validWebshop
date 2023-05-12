export async function load({ request }) {
	// const result = await request.formData();
	// const priceSum = result.get('priceSum');
	// const prodArr = result.get('productArr');
	// return { priceSum, prodArr };
}

export const actions = {
	paymentProcessing: async ({ request }) => {
		const result1 = await request.formData();
		const priceSum = result1.get('priceSum');
		const prodArr = result1.get('productArr');
		return { priceSum, prodArr };
	},

	validateCheckout: async ({request}) => {
		console.log('ho');
	}
};
