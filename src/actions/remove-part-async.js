import { ERROR_MESSAGE } from '../constants';
import { deletePart } from './delete-part';
import { setIdForPartUpdating } from './set-id-for-part-updating';
import { setServerError } from './set-server-error';

export const removePartAsync = (requestServer, partId) => (dispatch) =>
	requestServer('removePart', partId).then(({ error, response }) => {
		if (error !== null) {
			dispatch(setServerError(error));
		} else if (!response) {
			dispatch(setServerError(ERROR_MESSAGE.SERVER));
		} else {
			dispatch(deletePart(partId));
			dispatch(setIdForPartUpdating(partId))
			return { successfully: true };
		}
	});
