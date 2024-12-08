import { URL } from '../constants';

export const getCart = (cartId) =>
	fetch(`${URL.CART_DATA}/${cartId}`).then((response) => response.json());
