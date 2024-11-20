import { deleteUser } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removeUser = async (userSession, userIdForDelete) => {
	const accessRoles = [ROLE.ADMIN];
	const access = sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'У Вас нет прав для удаления пользователей!',
			response: null,
		};
	}

	const { ok } = await deleteUser(userIdForDelete);

	return {
		error: null,
		response: ok,
	};
};
