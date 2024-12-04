import { URL } from '../constants';

export const getCart = (cartId) =>
	fetch(`${URL.CART}/${cartId}`).then((response) => response.json());
