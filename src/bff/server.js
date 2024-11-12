import { addUser } from './add-user';
import { ROLE} from './constants';
import { getStatuses } from './get-statuses';
import { getUser } from './get-user';
import { sessions } from './sessions';
import { getUserStatus } from './utils';

export const server = {
	logout(session) {
		sessions.remove(session);
	},

	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				response: null,
			};
		}

		if (user.password !== authPassword) {
			return {
				error: 'Неверный пароль',
				response: null,
			};
		} else {
			delete user.password;
		}

		const statuses = await getStatuses();
		const session = sessions.create(user);

		if (user.roleId === ROLE.ADMIN)
			return {
				error: null,
				response: {
					loadedUser: { ...user, session },
					loadedStatuses: statuses,
				},
			};

		const userStatus = getUserStatus(statuses, user.statusId, user.amount);

		return {
			error: null,
			response: {
				loadedUser: { ...user, session, status: userStatus },
				loadedStatuses: statuses,
			},
		};
	},

	async register(regLogin, regPassword) {
		const existedUser = await getUser(regLogin);

		if (existedUser) {
			return {
				error: 'Пользователь с таким логином уже зарегестрирован',
				response: null,
			};
		}

		const registeredUser = await addUser(regLogin, regPassword)
		const statuses = await getStatuses();
		const userStatus = getUserStatus(statuses, registeredUser.statusId, registeredUser.amount);
		const session = sessions.create(registeredUser);

		return {
			error: null,
			response: {
				loadedUser: { ...registeredUser, session, status: userStatus },
				loadedStatuses: statuses,
			},
		};
	},
};
