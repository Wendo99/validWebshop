let oldArr = [88, 64, 5, 1, 6453, 123, 4123, 312, 12, 54, 89, 2, 48, 442];

console.log(oldArr);



function sortArr(newArr) {

	for (let lastindex = newArr.length - 1; lastindex > 0; lastindex--) {

		for (let startIndex = 0; startIndex < lastindex; startIndex++) {

			if (newArr[startIndex] > newArr[startIndex + 1]) {

				let temp = newArr[startIndex + 1];
				newArr[startIndex + 1] = newArr[startIndex];
				newArr[startIndex] = temp;
			}
		}
	}
}


sortArr(oldArr);
console.log(oldArr);
