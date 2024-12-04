import { addSession, deleteSession, getSession } from './api';

export const sessions = {
	async create(roleId) {
		const hash = Math.random().toFixed(50);
		const session = await addSession(hash, roleId);
		return session;
	},
	async remove(hash) {
		const session = await getSession(hash);
		if (session) deleteSession(session.id);
	},
	async access(hash, accessRoles) {
		const session = await getSession(hash);
		return !!session && accessRoles.includes(session.userRoleId);
	},
};
