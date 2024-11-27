import { getZeros } from './get-zeros';

export const getDiscountedPrice = (price, discount) =>
	getZeros((price - price * (discount / 100)).toFixed(2));
