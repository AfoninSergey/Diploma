import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUserSession } from '../selectors';
import { server } from '../bff';

export const useServerRequest = () => {
	const userSession = useSelector(selectUserSession);

	return useCallback((operation, ...params) => {
		const request = ['authorize', 'register'].includes(operation)
			? params
			: [userSession, ...params];

		return server[operation](...request);
	}, [userSession])
};
