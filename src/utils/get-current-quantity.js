export const getCurrentQuantity = (initialQuantity, parts, partId) => {
	const partInCart = parts.find((part) => part.id === partId)

	console.log('initialQuantity', initialQuantity)

	return partInCart ? initialQuantity - partInCart.quantity : initialQuantity
}