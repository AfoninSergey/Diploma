import { ACTION_TYPE } from "../actions"

const initialUsersState = []

export const usersRsducer = (state = initialUsersState, {type, payload}) => {
	switch(type) {
		case ACTION_TYPE.SET_USERS:
			return [...payload]
		default:
		return state
	}
}