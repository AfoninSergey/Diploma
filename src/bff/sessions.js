export const sessions = {
	list: {},
	create(roleId) {
		const hash = Math.random().toFixed(50);

		this.list[hash] = roleId;
		console.log(this.list);
		return hash;
	},
	remove(hash) {
		delete this.list[hash];
		console.log(this.list);
	},
	access(hash, accessRoles) {
		return accessRoles.includes(this.list[hash]);
	},
};
