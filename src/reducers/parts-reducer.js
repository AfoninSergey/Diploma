import { ACTION_TYPE } from "../actions";

const initialPartsState = [];
export const partsReducer = (state = initialPartsState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_PARTS:
			return [...payload]
		default:
			return state;
	}
};
