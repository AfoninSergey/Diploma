import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const checkAccess = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];
	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: true,
			response: null,
		};
	}

	return {
		error: null,
		response: true,
	};
};
