import { URL } from '../constants';
import { transformUsers } from '../transformers';

export const getUsers = () =>
	fetch(URL.USERS)
		.then((response) => response.json())
		.then((loadedUsers) => loadedUsers && transformUsers(loadedUsers));
