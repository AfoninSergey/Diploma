import { server } from '../bff/server';
import { ACTION_TYPE } from './action-type';

export const logout = (session) => {
	server.logout(session)
	return {
		type: ACTION_TYPE.LOGOUT,
	}
};
