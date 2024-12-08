import { deleteCartData } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removeCartData = async (userSession, cartId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.CLIENT];
	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'Ошибка! Вы не авторизованы! Для добавления товаров в корзину и для удаления товаров из корзины, войдите в свою учетную запись!',
			response: null,
		};
	}

	const { ok } = await deleteCartData(cartId);

	return {
		error: null,
		response: ok,
	};
};
