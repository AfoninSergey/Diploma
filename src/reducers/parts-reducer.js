import { ACTION_TYPE } from '../actions';

const initialPartsState = {
	partList: [],
	idForPartUpdating: null,
};
export const partsReducer = (state = initialPartsState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_PARTS:
			return { ...state, partList: [...payload] };
		case ACTION_TYPE.UPDATE_CHANGED_PART:
			return {
				...state,
				partList: state.partList.map((part) =>
					part.id === payload.id
						? { ...part, [payload.name]: payload.value }
						: part,
				),
			};
		case ACTION_TYPE.RESET_PART_DATA:
			return {
				...state,
				partList: state.partList.map((part) =>
					part.id === payload.id ? payload : part,
				),
			};
		case ACTION_TYPE.DELETE_PART:
			return {
				...state,
				partList: state.partList.filter((part) => part.id !== payload),
			};
		case ACTION_TYPE.SET_PART_ID:
			return { ...state, idForPartUpdating: payload };
		default:
			return state;
	}
};
