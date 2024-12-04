import { setUserData } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const updateUserData = async (userSession, userId, statusId, amount) => {
	// const accessRoles = [777]; //Тест доступа TODO
	const accessRoles = [ROLE.ADMIN];
	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'У Вас нет прав для изменения данных пользователей!',
			response: null,
		};
	}

	const updatedUser = await setUserData(userId, statusId, amount);

	return {
		error: null,
		response: updatedUser,
	};
};
