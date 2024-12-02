const initialCartState = {
	selectedParts: [],
	totalNumber: 0,
	totalAmount: '0.00'
}; /* part_id / quantity */
export const cartReducer = (state = initialCartState, { type, payload }) => {
	switch (type) {
		// case
		default:
			return state;
	}
};
