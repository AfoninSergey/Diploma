import { ERROR_MESSAGE } from '../constants';
import { setServerError } from './set-server-error';
import { updateChangedParts } from './update-changed-parts';

export const savePartsDataAsync =
	(requestServer, initialPartsData, partsDataWithChanges) => (dispatch) =>
		requestServer(
			'updatePartsData',
			initialPartsData,
			partsDataWithChanges,
		).then(({ error, response }) => {
			if (error !== null) {
				dispatch(setServerError(error));
			} else if (response.some(({ article }) => article === undefined)) {
				dispatch(setServerError(ERROR_MESSAGE.SERVER));
			} else {
				dispatch(updateChangedParts(response))
				return {updatedSuccessfully: true};
			}


		});
