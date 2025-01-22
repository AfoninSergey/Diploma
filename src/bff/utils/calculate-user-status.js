import { STATUS } from '../constants';
import { getZeros } from './get-zeros';

export const calculateUserStatus = (statuses, userStatusId = 0, userAmount) => {
	console.log('statuses1', statuses)
	const { discount, limit } = statuses.find(
		(status) => status.id === userStatusId,
	);
	console.log('statuses1+')
	return userStatusId !== STATUS.LARGE_WHOLESALE
		? {
				discount,
				remainAmount: getZeros(limit - userAmount),
				nextDiscount: discount + 5,
			}
		: { discount };
};
