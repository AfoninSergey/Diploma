import { ROLE, URL } from '../constants';
import { transformUser } from '../transformers';

export const addUser = (login, password) =>
	fetch(URL.USERS, {
		method: 'POST',
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify({
			login,
			password,
			role_id: ROLE.CLIENT,
			status_id: 0,
			amount: '0',
		}),
	})
		.then((response) => response.json())
		.then((registeredUser) => registeredUser && transformUser(registeredUser));
