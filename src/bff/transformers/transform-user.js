import { ROLE } from '../../constants';

export const transformUser = (dbUser) =>
	dbUser.role_id === ROLE.ADMIN
		? {
				id: dbUser.id,
				login: dbUser.login,
				password: dbUser.password,
				roleId: dbUser.role_id,
			}
		: {
				id: dbUser.id,
				login: dbUser.login,
				password: dbUser.password,
				roleId: dbUser.role_id,
				statusId: dbUser.status_id,
				amount: dbUser.amount,
			};
