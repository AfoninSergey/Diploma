import { getParts } from '../api';
import { sortByAlphabet } from '../utils';

export const fetchParts = async () => {
	const parts = await getParts();

	return {
		error: null,
		response: sortByAlphabet(parts, 'name'),
	};
};
