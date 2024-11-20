import { URL } from '../constants';
import { transformUser } from '../transformers';

export const setUserData = (userId, statusId, amount) =>
	// fetch(`${URL.USERS}/${userId}test server error`, { //Тест ошибки сервера TODO
	fetch(`${URL.USERS}/${userId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify({
			status_id: statusId,
			amount: amount || '0',
		}),
	})
		.then((response) => response.json())
		.then((loadedUser) => loadedUser && transformUser(loadedUser));
