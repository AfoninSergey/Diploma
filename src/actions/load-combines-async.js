import { setCombines } from './set-combines';

export const loadCombinesAsync = (requestServer) => (dispatch) =>
	requestServer('fetchCombines').then(({ response }) =>
		dispatch(setCombines(response)),
	);
