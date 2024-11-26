export const sortByAlphabet = (array, sortingValue) =>
	[...array].sort((a, b) => a[sortingValue].localeCompare(b[sortingValue]));
