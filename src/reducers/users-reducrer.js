import { ACTION_TYPE } from '../actions';

const initialUsersState = [];

export const usersRsducer = (state = initialUsersState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_USERS:
			return [...payload];
		case ACTION_TYPE.UPDATE_USER:
			return state.map((user) =>
				user.id === payload.id ? { ...payload } : user,
			);

		case ACTION_TYPE.DELETE_USER:
			return state.filter((user) => user.id !== payload);
		default:
			return state;
	}
};
