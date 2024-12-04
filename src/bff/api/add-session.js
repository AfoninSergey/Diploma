import { URL } from '../constants';

export const addSession = (currentSessionHash, currentUserRoleId) =>
	fetch(URL.SESSIONS, {
		method: 'POST',
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify({
			hash: currentSessionHash,
			userRoleId: currentUserRoleId,
		}),
	})
		.then((response) => response.json())
		.then((loadedSession) => loadedSession);
