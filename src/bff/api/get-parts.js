import { URL } from '../constants';
import { transformPartsForApp } from '../transformers';

export const getParts = () =>
	fetch(URL.PARTS)
		.then((response) => response.json())
		.then((loadedParts) => loadedParts && transformPartsForApp(loadedParts));
