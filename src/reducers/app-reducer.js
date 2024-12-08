import { ACTION_TYPE } from '../actions';
import { ERROR_MESSAGE } from '../constants';

const initialAppState = {
	authAndRegForm: {
		login: '',
		password: '',
		repeatPassword: '',
		validationError: null,
	},
	serverError: null,
	accessError: ERROR_MESSAGE.ACCESS,
	isLoading: true,
	updateUsersTrigger: false,
	modal: {
		isOpen: false,
		restText: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};
export const appReducer = (state = initialAppState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_LOGIN:
			return {
				...state,
				serverError: null,
				authAndRegForm: {
					...state.authAndRegForm,
					login: payload,
				},
			};
		case ACTION_TYPE.SET_PASSWORD:
			return {
				...state,
				serverError: null,
				authAndRegForm: {
					...state.authAndRegForm,
					password: payload,
				},
			};
		case ACTION_TYPE.SET_REPEAT_PASSWORD:
			return {
				...state,
				serverError: null,
				authAndRegForm: {
					...state.authAndRegForm,
					repeatPassword: payload,
				},
			};
		case ACTION_TYPE.SET_SERVER_ERROR:
			return {
				...state,
				serverError: payload,
				authAndRegForm: {
					...state.authAndRegForm,
				},
			};
		case ACTION_TYPE.SET_VALIDATION_ERROR:
			return {
				...state,
				authAndRegForm: {
					...state.authAndRegForm,
					validationError: payload,
				},
			};
		case ACTION_TYPE.RESET_AUTH_AND_REG_FORM:
			return {
				...state,
				authAndRegForm: initialAppState.authAndRegForm,
			};
		case ACTION_TYPE.RESET_AUTH_AND_REG_FORM_ERROR:
			return {
				...state,
				serverError: null,
				authAndRegForm: {
					...state.authAndRegForm,
					validationError: null,
				},
			};
		case ACTION_TYPE.SET_ACCESS_ERROR:
			return {
				...state,
				accessError: payload,
			};
		case ACTION_TYPE.CHANGE_TRIGGER:
			return {
				...state,
				updateUsersTrigger: !state.updateUsersTrigger,
			};
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...initialAppState.modal,
					isOpen: true,
					restText: payload.text,
					onConfirm: payload.onConfirm,
				},
			};
		case ACTION_TYPE.CLOSE_MODAL:
			return {
				...state,
				modal: initialAppState.modal,
			};
		default:
			return state;
	}
};
