import { addPart } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const addNewPart =  async(userSession, newPartData) => {
	const accessRoles = [ROLE.ADMIN];
	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'У Вас нет прав для добавления новых запчастей!',
			response: null,
		};
	}

	const addedPart = await addPart(newPartData);

	return {
		error: null,
		response: addedPart
	}

}

