import { ERROR_MESSAGE } from '../constants';
import { CHANGE_UPDATE_PARTS_TRIGGER } from './change-update-parts-trigger';
import { setServerError } from './set-server-error';

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
				dispatch(CHANGE_UPDATE_PARTS_TRIGGER)
				return { updatedSuccessfully: true };
			}
		});
