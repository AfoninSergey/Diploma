export const sessions = {
	list: {},
	create(roleId) {
		const hash = Math.random().toFixed(50);

		this.list[hash] = roleId;

		return hash;
	},
	remove(hash) {
		delete this.list[hash];
	},
	access(hash, accessRole) {
		return this.list[hash] === accessRole;
	},
};
