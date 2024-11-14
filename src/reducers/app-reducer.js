import { ACTION_TYPE } from '../actions';

const initialAppState = {
	authAndRegForm: {
		login: '',
		password: '',
		repeatPassword: '',
		validationError: null,
		serverError: null,
	},
	accessError: 'Доступ запрещён!',
	isLoading: true,
};
export const appReducer = (state = initialAppState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_LOGIN:
			return {
				...state,
				authAndRegForm: {
					...state.authAndRegForm,
					login: payload,
					serverError: null,
				},
			};
		case ACTION_TYPE.SET_PASSWORD:
			return {
				...state,
				authAndRegForm: {
					...state.authAndRegForm,
					password: payload,
					serverError: null,
				},
			};
		case ACTION_TYPE.SET_REPEAT_PASSWORD:
			return {
				...state,
				authAndRegForm: {
					...state.authAndRegForm,
					repeatPassword: payload,
					serverError: null,
				},
			};
		case ACTION_TYPE.SET_SERVER_ERROR:
			return {
				...state,
				authAndRegForm: {
					...state.authAndRegForm,
					serverError: payload,
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
				authAndRegForm: {
					...initialAppState.authAndRegForm,
				},
			};
		case ACTION_TYPE.RESET_AUTH_AND_REG_FORM_ERROR:
			return {
				...state,
				authAndRegForm: {
					...state.authAndRegForm,
					serverError: null,
					validationError: null,
				},
			};
		case ACTION_TYPE.SET_ACCESS_ERROR:
			return {
				...state,
				accessError: payload,
			};
		default:
			return state;
	}
};
