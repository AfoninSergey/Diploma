import { setPartData } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getChangedObjects } from '../utils';

export const updatePartsData = async (
	userSession,
	initialPartsData,
	partsDataWithChanges,
) => {
	const accessRoles = [ROLE.ADMIN];
	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'У Вас нет прав для изменения данных запчастей!',
			response: null,
		};
	}

	const arrayOfChangedParts = getChangedObjects(
		initialPartsData,
		partsDataWithChanges,
	);

	const updatedParts = await Promise.all(
		arrayOfChangedParts.map((changedPart) => setPartData(changedPart.id, changedPart)),
	);

	return {
		error: null,
		response: updatedParts,
	};
};
