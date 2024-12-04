import { URL } from '../constants';

export const setCartData = (cartData) => {

	const url = cartData.cartDataOnServer ? `${URL.CART}/${cartData.id}` : URL.CART;
	const method = cartData.cartDataOnServer ? 'PUT' : 'POST';

	// fetch(`${URL.USERS}/${userId}test server error`, { //Тест ошибки сервера TODO
	return fetch(url, {
		method,
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify(cartData),
	}).then((response) => response.json());
};
