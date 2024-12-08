import { setCart } from "./set-cart"

export const updateCartAsync = (requestServer, cartData) => (dispatch) =>
	requestServer('updateCartData', cartData).then(({error, response}) => {
		if (error) return error
		dispatch(setCart(response))
	})
