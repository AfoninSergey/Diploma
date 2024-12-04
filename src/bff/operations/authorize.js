import { getCart, getStatuses, getUser } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { calculateUserStatus } from '../utils';

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);

	if (!user) {
		return {
			error: 'Такой пользователь не найден!',
			response: null,
		};
	}

	if (user.password !== authPassword) {
		return {
			error: 'Неверный пароль!',
			response: null,
		};
	}

	delete user.password;

	const [cartFromServer, statuses] = await Promise.all([
		getCart(user.id),
		getStatuses(),
	]);
	const session = await sessions.create(user.roleId);

	if (user.roleId === ROLE.ADMIN)
		return {
			error: null,
			response: {
				loadedUser: { ...user, session },
				loadedStatuses: statuses,
			},
		};

	const userStatus = calculateUserStatus(statuses, user.statusId, user.amount);

	return {
		error: null,
		response: {
			loadedUser: { ...user, session, status: userStatus },
			loadedStatuses: statuses,
			cart: cartFromServer,
		},
	};
};
