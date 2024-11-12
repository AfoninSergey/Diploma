import { STATUS } from '../constants';

export const getUserStatus = (statuses, userStatusId, userAmount) => {
	const { discount, limit } = statuses.find(
		(status) => status.id === userStatusId,
	);

	return userStatusId !== STATUS.LARGE_WHOLESALE
		? {
				discount,
				remainAmount: limit - userAmount,
				nextDiscount: discount + 5,
			}
		: { discount };
};
