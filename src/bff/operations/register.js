import { addUser, getStatuses, getUser } from '../api';
import { sessions } from '../sessions';
import { getUserStatus } from '../utils';

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin);

	if (existedUser) {
		return {
			error: 'Пользователь с таким логином уже зарегестрирован',
			response: null,
		};
	}

	// const registeredUser = await addUser(regLogin, regPassword);
	// const statuses = await getStatuses();

	const [registeredUser, statuses] = await Promise.all([
		addUser(regLogin, regPassword),
		getStatuses(),
	]);

	const userStatus = getUserStatus(
		statuses,
		registeredUser.statusId,
		registeredUser.amount,
	);

	const session = sessions.create(registeredUser);

	return {
		error: null,
		response: {
			loadedUser: { ...registeredUser, session, status: userStatus },
			loadedStatuses: statuses,
		},
	};
};
