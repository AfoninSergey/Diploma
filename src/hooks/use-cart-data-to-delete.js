import { useSelector } from 'react-redux';
import {
	selectCartDataOnServer,
	selectCartParts,
	selectCartTotalAmount,
	selectCartTotalNumber,
	selectUserId,
} from '../selectors';
import { getZeros } from '../utils';

export const useCartDataToDelete = (partId, price, quantity) => {
	const userId = useSelector(selectUserId);
	const cartTotalNumber = useSelector(selectCartTotalNumber);
	const cartTotalAmount = useSelector(selectCartTotalAmount);
	const cartParts = useSelector(selectCartParts);
	const cartDataOnServer = useSelector(selectCartDataOnServer);

	return {
		id: userId,
		selectedParts: cartParts.filter((part) => part.id !== partId),
		totalNumber: cartTotalNumber - quantity,
		totalAmount: getZeros(cartTotalAmount - price),
		cartDataOnServer,
	};
};