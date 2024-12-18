import { useSelector } from 'react-redux';
import { selectCartData } from '../selectors';

export const useOrderData = (delivery, adress, payment) => {
	const cartData = useSelector(selectCartData);
	cartData.userId = cartData.id

	delete cartData.cartDataOnServer;
	delete cartData.id;

	const orderData = { ...cartData, delivery, payment };

	if (adress) orderData.adress = adress;

	return orderData;
};
