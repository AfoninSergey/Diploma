import { setAccessError } from './set-access-error';


export const checkAccessAsync = (requestServer) => (dispatch) =>
	requestServer('checkAccess').then(({ error }) => {
		dispatch(setAccessError(error));
	});
