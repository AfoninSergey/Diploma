import { ERROR_MESSAGE } from '../constants';
import { setServerError } from './set-server-error';

export const savePartDataAsync =
	(requestServer, partId, updatedPart) => (dispatch) =>
		requestServer('updatePartData', partId, updatedPart).then(
			({ error, response }) => {
				if (error !== null) {
					dispatch(setServerError(error));
				} else if (response.id === undefined) {
					dispatch(setServerError(ERROR_MESSAGE.SERVER));
				}
				return { error, response };
			},
		);
