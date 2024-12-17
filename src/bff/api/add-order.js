import { URL } from '../constants';

export const addOrder = (orderData) =>
	fetch(URL.ORDERS, {
		method: 'POST',
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify(orderData),
	})
		.then((response) => response.json())
		.then((newOrder) => newOrder);
