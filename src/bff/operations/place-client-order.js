// import { addPart } from '../api';
import { addOrder, deleteCartData, getSession, getStatuses, setUserData } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { calculateUserStatus } from '../utils';

export const placeClientOrder = async (
	userSession,
	{ userId, newUserStatusId, newUserAmount },
	orderData,
) => {
	const accessRoles = [ROLE.ADMIN, ROLE.CLIENT];
	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'У Вас нет прав для оформления заказа! Войдите в учётную запись или зарегестрируйтесь',
			response: null,
		};
	}

	const [updatedUser, addedOrder] = await Promise.all([
		setUserData(userId, newUserStatusId, newUserAmount),
		addOrder(orderData),
	]);
	const success = updatedUser?.id !== undefined && addedOrder?.id !== undefined;

	if (!success) {
		return {
			error: null,
			response: null,
		};
	}

	const [session, statuses] = await Promise.all([
		getSession(userSession),
		getStatuses(),
	]);
	delete updatedUser.password;

	const userStatus = calculateUserStatus(
			statuses,
			updatedUser.statusId,
			updatedUser.amount,
		);

		deleteCartData(userId)

		return {
			error: null,
			response: { ...updatedUser, session, status: userStatus },
		};
};
