export function getCurrencyString(value: string | number) {
	let tmp = value;

	if (typeof value == 'string') {
		tmp = parseFloat(value);
    }
    
	const result: string = tmp.toLocaleString('de-DE', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	return result;
}
