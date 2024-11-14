import { addUser, getStatuses, getUser } from '../api';
import { sessions } from '../sessions';
import { calculateUserStatus } from '../utils';

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin);

	if (existedUser) {
		return {
			error: 'Пользователь с таким логином уже зарегестрирован',
			response: null,
		};
	}

	const [registeredUser, statuses] = await Promise.all([
		addUser(regLogin, regPassword),
		getStatuses(),
	]);

	delete registeredUser.password;

	const userStatus = calculateUserStatus(
		statuses,
		registeredUser.statusId,
		registeredUser.amount,
	);

	const session = sessions.create(registeredUser.roleId);


	return {
		error: null,
		response: {
			loadedUser: { ...registeredUser, session, status: userStatus },
			loadedStatuses: statuses,
		},
	};
};
