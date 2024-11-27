import { setParts } from './set-parts';

export const loadPartsAsync = (requestServer) => (dispatch) =>
	requestServer('fetchParts').then(({ response }) => {
		dispatch(setParts(response));
		return response;
	});
