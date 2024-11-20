import { deleteUser } from './delete-user';

export const removeUserAsync = (requestServer, userId) => (dispatch) =>
	requestServer('removeUser', userId).then(({ error, response }) => {
		if (error === null && response) {
			dispatch(deleteUser(userId));
		}
		return { error, response };
	});
