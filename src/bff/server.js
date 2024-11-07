import { ROLE, URL } from './constants';
import { getUser } from './get-user';

export const server = {
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user) {
			console.log('Такой пользователь не найден');
			return {
				error: 'Такой пользователь не найден',
				response: null,
			};
		}

		if (user.password !== authPassword) {
			console.log('Неверный пароль');
			return {
				error: 'Неверный пароль',
				response: null,
			};
		}
		console.log('Авторизация прошла успешно');
		return {
			error: null,
			response: true,
		};
	},

	async register(regLogin, regPassword) {
		const user = await getUser(regLogin);

		if (user) {
			console.log('Пользователь с таким логином уже зарегестрирован');
			return {
				error: 'Пользователь с таким логином уже зарегестрирован',
				response: null,
			};
		}

		await fetch(URL.USERS, {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/json; Charset=UTF-8',
			},
			body: JSON.stringify({
				login: regLogin,
				password: regPassword,
				role_id: ROLE.CLIENT,
				status_id: 0,
				amount: '',
			}),
		});
		console.log('Регистрация прошла успешно');
		return {
			error: null,
			response: true,
		};
	},
};
