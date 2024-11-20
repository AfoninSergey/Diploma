import { URL } from '../constants';

export const deleteUser = (userId) =>
	fetch(`${URL.USERS}/${userId}`, {
		method: 'DELETE',
	})
