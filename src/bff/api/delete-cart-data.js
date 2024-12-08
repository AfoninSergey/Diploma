import { URL } from '../constants';

export const deleteCartData = (cartId) =>
	fetch(`${URL.CART_DATA}/${cartId}`, {
		method: 'DELETE',
	});
