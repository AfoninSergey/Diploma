import { getCombines } from '../api';

export const fetchCombines = async () => {
	const combines = await getCombines();

	return {
		error: null,
		response: combines,
	};
};
