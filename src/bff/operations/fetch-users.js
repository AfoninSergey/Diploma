import { getUsers } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const fetchUsers = async (userSession) => {
	const access = sessions.access(userSession, ROLE.ADMIN)

	if (!access) {
		return {
			error: 'Доступ запрещён!',
			response: null,
		};
	}

	const users = await getUsers();

	return {
		error: null,
		response: users,
	};
};
