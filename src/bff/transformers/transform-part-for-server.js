export const transformPartForServer = ({
	imageUrl,
	combineId,
	quantity,
	article,
	name,
	price,
}) => ({
	image_url: imageUrl,
	combine_id: combineId,
	quantity: +quantity,
	article,
	name,
	price,
});
