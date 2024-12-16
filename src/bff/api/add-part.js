import { URL } from '../constants';
import { transformPartForApp, transformPartForServer } from '../transformers';

export const addPart = (newPartData) =>
	fetch(URL.PARTS, {
		method: 'POST',
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify(transformPartForServer(newPartData)),
	})
		.then((response) => response.json())
		.then((newPart) => newPart && transformPartForApp(newPart));
