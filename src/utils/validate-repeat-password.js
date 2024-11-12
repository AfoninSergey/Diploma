import { ERROR_MESSAGE } from './constants';

export const validateRepeatPassword = (password, value) =>
	password === value ? null : ERROR_MESSAGE.PASSWORD_REPEAT;
