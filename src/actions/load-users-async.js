import { setAccessError } from './set-access-error';
import { setUsers } from './set-users';

export const loadUsersAsync = (requestServer, accessError) => (dispatch) =>
	requestServer('fetchUsers').then((loadedUsers) => {
		dispatch(setAccessError(loadedUsers.error));

		if (!accessError && loadedUsers.response !== null) {
			dispatch(setUsers(loadedUsers.response));
			return loadedUsers.response
		}
	});
