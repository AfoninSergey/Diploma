import { ERROR_MESSAGE } from '../constants';
import { addNewPart } from './add-new-part';
import { setServerError } from './set-server-error';

export const addNewPartAsync = (requestServer, newPartData) => (dispatch) =>
	requestServer('addNewPart', newPartData).then(({ error, response }) => {
		if (error !== null) {
			dispatch(setServerError(error));
			return { successfully: false }
		} else if (response.id === undefined) {
			dispatch(setServerError(ERROR_MESSAGE.SERVER));
			return { successfully: false }
		} else {
			dispatch(addNewPart(response));
			return { successfully: true }
		}
	});

