import { setPartData } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const updatePartData = async (userSession, partId, updatedPartData) => {
	// const accessRoles = [777]; //Тест доступа TODO
	const accessRoles = [ROLE.ADMIN];
	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'У Вас нет прав для изменения данных запчастей!',
			response: null,
		};
	}

	const updatedPart = await setPartData(partId, updatedPartData);

	return {
		error: null,
		response: updatedPart,
	};
};
