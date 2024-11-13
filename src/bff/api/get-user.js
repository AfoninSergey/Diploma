import { URL } from '../constants';
import { transformUser } from '../transformers';

export const getUser = (loginToFind) =>
	fetch(`${URL.USERS}?login=${loginToFind}`)
		.then((response) => response.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser));
