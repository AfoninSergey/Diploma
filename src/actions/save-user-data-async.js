import { updateUser } from './update-user';

export const saveUserDataAsync =
	(requestServer, userId, statusId, amount) => (dispatch) =>
		requestServer('updateUserData', userId, statusId, amount).then(
			({ error, response }) => {
				if (
					error === null &&
					response.amount !== undefined &&
					response.statusId !== undefined
				) {
					dispatch(updateUser(response));
				}
				return { error, response };
			},
		);
