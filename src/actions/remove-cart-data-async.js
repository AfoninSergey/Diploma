import { RESET_CART } from "./reset-cart";

export const removeCartDataAsync = (requestServer, cartId) => (dispatch) =>
	requestServer('removeCartData', cartId).then(({ error, response }) => {
		if (error === null && response) {
			dispatch(RESET_CART);
		}
		return { error, response };
	})
