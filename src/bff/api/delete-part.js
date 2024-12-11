import { URL } from '../constants';

export const deletePart = (partId) =>
	fetch(`${URL.PARTS}/${partId}`, {
		method: 'DELETE',
	})
