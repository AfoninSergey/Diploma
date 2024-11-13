import { STATUS } from '../constants';
import { getZeros } from './get-zeros';

export const getUserStatus = (statuses, userStatusId, userAmount) => {
	const { discount, limit } = statuses.find(
		(status) => status.id === userStatusId,
	);

	return userStatusId !== STATUS.LARGE_WHOLESALE
		? {
				discount,
				remainAmount: getZeros(limit - userAmount),
				nextDiscount: discount + 5,
			}
		: { discount };
};
