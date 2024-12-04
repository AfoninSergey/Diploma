import { URL } from '../constants';

export const deleteSession = (sessionId) =>
	fetch(`${URL.SESSIONS}/${sessionId}`, {
		method: 'DELETE',
	});
