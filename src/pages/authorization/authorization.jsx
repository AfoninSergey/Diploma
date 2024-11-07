import { useState } from 'react';
import { Button, Form, Input } from '../../components';
import { ERROR_MESSAGE, REG_EXP } from '../../constants';
import styles from './authorization.module.css';
import { server } from '../../bff/server';
import { Link } from 'react-router-dom';

export const Authorization = () => {
	const [loginValue, setLoginValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [validationError, setValidationError] = useState(null);
	const [serverError, setServerError] = useState(null);

	const onLoginChange = ({ target: { value } }) => {
		setLoginValue(value);
		setServerError(null);

		let newError = null;

		if (!REG_EXP.LOGIN.test(value)) {
			newError = ERROR_MESSAGE.LOGIN;
		} else if (value.length > 20) {
			newError = ERROR_MESSAGE.LOGIN_LONG;
		}

		setValidationError(newError);
	};
	const onPasswordChange = ({ target: { value } }) => {
		setPasswordValue(value);
		setServerError(null);

		let newError = null;

		if (!REG_EXP.PASSWORD.test(value)) {
			newError = ERROR_MESSAGE.PASSWORD;
		} else if (value.length > 30) {
			newError = ERROR_MESSAGE.PASSWORD_LONG;
		}
		setValidationError(newError);
	};
	// const test = 'undefined'
	// console.log(test?.length)

	const onSubmit = (event) => {
		event.preventDefault();
		let newError = null;

		if (loginValue.length === 0 || passwordValue.length === 0) {
			newError = ERROR_MESSAGE.REQUIRED;
		} else if (loginValue.length < 3) {
			newError = ERROR_MESSAGE.LOGIN_SHORT;
		} else if (passwordValue.length < 3) {
			//ИСПРАВИТЬ ПОТОМ
			newError = ERROR_MESSAGE.PASSWORD_SHORT;
		} else {
			server.authorize(loginValue, passwordValue).then(({ error }) => {
				if (error) {
					setServerError(`Ошибка запроса! ${error}`);
				} else {
					setLoginValue('');
					setPasswordValue('');
					setValidationError(null);
					setServerError(null);
				}
			});
		}
		setValidationError(newError);
	};

	const errorMessage = validationError || serverError;

	return (
		<Form
			className={styles.auth}
			title="Авторизация:"
			errorMessage={errorMessage}
			onSubmit={onSubmit}
		>
			<Input
				id="login"
				type="text"
				name="login"
				label="Логин:"
				value={loginValue}
				onChange={onLoginChange}
			/>

			<Input
				id="password"
				type="password"
				name="password"
				label="Пароль:"
				value={passwordValue}
				onChange={onPasswordChange}
			/>

			<Button type="submit" disabled={validationError}>
				Войти
			</Button>

			или <Link to="/register">Зарегестрироваться</Link>
		</Form>
	);
};
