import { ACTION_TYPE } from "../actions";

const initialCombinesState = [];
export const combinesRducer = (state = initialCombinesState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_COMBINES:
		return [...payload]
		default:
			return state;
	}
};
