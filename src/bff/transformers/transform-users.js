import { ROLE } from '../constants';
import { getZeros } from '../utils';

export const transformUsers = (users) =>
	users
		.filter(({ role_id }) => role_id !== ROLE.ADMIN)
		.map((dbUser) => ({
			id: dbUser.id,
			login: dbUser.login,
			statusId: dbUser.status_id,
			amount: getZeros(dbUser.amount),
		}));
