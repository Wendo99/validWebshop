export function checkIfStringIsUndefined(value: string | number, typeToReturn: string) {
	const resultUndefined = '';
	if (value == undefined) {
		if (typeToReturn == 'text') {
			return resultUndefined;
		} else if (typeToReturn == 'number') return resultUndefined;
	} else {
		return value;
	}
}
