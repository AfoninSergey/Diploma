import { URL } from '../constants';
import { transformPart } from '../transformers';
// import { transformUser } from '../transformers';

export const setPartData = (
	partId,
	{ imageUrl, combineId, article, name, price, quantity },
) =>
	// fetch(`${URL.PARTS}/${partId}test server error`, { //Тест ошибки сервера TODO
	fetch(`${URL.PARTS}/${partId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			combine_id: combineId,
			quantity: +quantity,
			article,
			name,
			price,
		}),
	})
		.then((response) => response.json())
		.then((loadedPart) => loadedPart && transformPart(loadedPart));
