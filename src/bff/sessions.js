export const sessions = {
	list: {},
	create(user) {
		const hash = Math.random().toFixed(50);

		this.list[hash] = user;
		console.log(this.list)
		return hash;
	},
	remove(hash) {
		delete this.list[hash];
		console.log(this.list)
	},
};
