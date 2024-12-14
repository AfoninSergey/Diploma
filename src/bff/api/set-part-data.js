import { URL } from '../constants';
import { transformPartForApp, transformPartForServer } from '../transformers';

export const setPartData = (partId, updatedPartData) =>
	fetch(`${URL.PARTS}/${partId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify(transformPartForServer(updatedPartData)),
	})
		.then((response) => response.json())
		.then((loadedPart) => loadedPart && transformPartForApp(loadedPart));
