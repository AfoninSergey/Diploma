import { ERROR_MESSAGE } from '../constants';
import { RESET_CART } from './reset-cart';
import { setServerError } from './set-server-error';

import { setUser } from './set-user';

export const placeOrderAsync = (requestServer, userData, orderData) => (dispatch) =>
	requestServer('placeClientOrder', userData, orderData).then(
		({ error, response }) => {
			if (error !== null) {
				dispatch(setServerError(error));
				return { successfully: false };
			} else if (!response) {
				dispatch(setServerError(ERROR_MESSAGE.SERVER));
				return { successfully: response };
			} else {
				dispatch(setUser(response));
				sessionStorage.setItem(
					'currentUserData',
					JSON.stringify(response),
				);

				dispatch(RESET_CART);
				sessionStorage.removeItem('currentUserCartData');
				return { successfully: true };
			}
		},
	);
