import { ACTION_TYPE } from '../actions';

const initialStatusesState = [];
export const statusesReduser = (state = initialStatusesState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_STATUSES:
			return [...state,...payload];
		default:
			return state;
	}
};
