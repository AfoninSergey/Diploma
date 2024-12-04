import { URL } from '../constants';

export const getSession = (currentSession) =>
	fetch(`${URL.SESSIONS}?session=${currentSession}`)
		.then((response) => response.json())
		.then(([loadedSession]) => loadedSession);
