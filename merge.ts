function merge(arrays: number[][]): number[] {
	const trackers: number[] = Array(arrays.length).fill(0);
	const mergedArray: number[] = Array(
		arrays.reduce((accum, curr) => accum + curr.length, 0)
	);
	let mergedArrayIndex = 0;
	while (true) {
		const indexOfArrayContainingSmallestNumber =
			findArrIdxContainingSmallestNumber(arrays, trackers);

		if (indexOfArrayContainingSmallestNumber === -1) {
			break;
		}

		mergedArray[mergedArrayIndex++] =
			arrays[indexOfArrayContainingSmallestNumber][
				trackers[indexOfArrayContainingSmallestNumber]
			];
		trackers[indexOfArrayContainingSmallestNumber] += 1;
	}
	console.log(mergedArray);
	return mergedArray;
}

function findArrIdxContainingSmallestNumber(
	arrays: number[][],
	trackers: number[]
): number {
	let smallestValue: number | null = null;
	let indexOfArrayContainingSmallestNumber: number | null = null;

	// initialize smallest value
	for (let index = 0, len = arrays.length; index < len; index += 1) {
		if (trackers[index] < arrays[index].length) {
			smallestValue = arrays[index][trackers[index]];
			indexOfArrayContainingSmallestNumber = index;
			break;
		}
	}

	// at this point, we've either exhausted our search or
	if (smallestValue === null) {
		return indexOfArrayContainingSmallestNumber === null
			? -1
			: indexOfArrayContainingSmallestNumber;
	}

	let index = 0;
	for (const len = arrays.length; index < len; index += 1) {
		const currentValue = arrays[index][trackers[index]];
		if (currentValue < smallestValue) {
			smallestValue = currentValue;
			indexOfArrayContainingSmallestNumber = index;
		}
	}

	return indexOfArrayContainingSmallestNumber === null
		? -1
		: indexOfArrayContainingSmallestNumber;
}

merge([
	[4, 6, 12, 98],
	[3, 5, 9],
	[3, 10, 16, 50],
	[2, 4, 18],
]); // [3, 4, 5, 6, 9, 12]
