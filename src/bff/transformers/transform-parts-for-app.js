export const transformPartsForApp = (parts) =>
	parts.map((dbPart) => ({
		id: dbPart.id,
		imageUrl: dbPart.image_url,
		article: dbPart.article,
		name: dbPart.name,
		price: dbPart.price,
		quantity: dbPart.quantity,
		combineId: dbPart.combine_id,
	}));
