import { URL } from '../constants';

export const setCartData = (cartData) => {
	const url = cartData.cartDataOnServer
		? `${URL.CART_DATA}/${cartData.id}`
		: URL.CART_DATA;
	const method = cartData.cartDataOnServer ? 'PUT' : 'POST';

	return fetch(url, {
		method,
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify(cartData),
	}).then((response) => response.json());
};
