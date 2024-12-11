import { deletePart } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removePart = async (userSession, userIdForDelete) => {
	const accessRoles = [ROLE.ADMIN];
	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'У Вас нет прав для удаления запчастей!',
			response: null,
		};
	}

	const {ok} = await deletePart(userIdForDelete);

	return {
		error: null,
		response: ok,
	};
};
