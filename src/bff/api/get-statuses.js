import { URL } from '../constants';

export const getStatuses = () =>
	fetch(URL.STATUSES)
		.then((response) => response.json())
		.then((loadedStatuses) => loadedStatuses);
