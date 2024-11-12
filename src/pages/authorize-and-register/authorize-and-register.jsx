import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import { Button, Form, Input } from '../../components';
import { server } from '../../bff/server';
import {
	logout,
	RESET_AUTH_AND_REG_FORM,
	RESET_AUTH_AND_REG_FORM_ERROR,
	setLoginValue,
	setPasswordValue,
	setRepeatPasswordValue,
	setServerError,
	setStatuses,
	setUser,
	setValidationError,
} from '../../actions';
import {
	selectLoginValue,
	selectPasswordValue,
	selectRepeatPasswordValue,
	selectServerError,
	selectUserLogin,
	selectUserSession,
	selectValidationError,
} from '../../selectors';
import {
	validateLogin,
	validatePassword,
	validateRepeatPassword,
	validateSubmitData,
} from '../../utils';
import styles from './authorize-and-register.module.css';

export const AuthorizeAndRegister = () => {
	const loginValue = useSelector(selectLoginValue);
	const passwordValue = useSelector(selectPasswordValue);
	const repeatPasswordValue = useSelector(selectRepeatPasswordValue);
	const serverError = useSelector(selectServerError);
	const validationError = useSelector(selectValidationError);

	const userLogin = useSelector(selectUserLogin);
	const userSession = useSelector(selectUserSession);
	const isReg = !!useMatch('/register');
	const dispatch = useDispatch();

	const onLoginChange = ({ target: { value } }) => {
		dispatch(setLoginValue(value));
		const newError = validateLogin(value);
		dispatch(setValidationError(newError));
	};

	const onPasswordChange = ({ target: { value } }) => {
		dispatch(setPasswordValue(value));
		const newError = validatePassword(value);
		dispatch(setValidationError(newError));
	};

	const onRepeatPasswordChange = ({ target: { value } }) => {
		dispatch(setRepeatPasswordValue(value));
		dispatch(setValidationError(null));
	};

	const onRepeatPasswordCheck = ({ target: { value } }) => {
		const newError = validateRepeatPassword(passwordValue, value);
		dispatch(setValidationError(newError));
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const newError =
			validateLogin(loginValue) ||
			validatePassword(passwordValue) ||
			validateSubmitData(
				loginValue,
				passwordValue,
				repeatPasswordValue,
				isReg,
			);

		if (newError) {
			dispatch(setValidationError(newError));
			return;
		}

		const serverResponse = isReg
			? server.register(loginValue, passwordValue)
			: server.authorize(loginValue, passwordValue);

		serverResponse.then(({ error, response }) => {
			if (error) {
				dispatch(setServerError(`Ошибка запроса! ${error}`));
			} else {
				dispatch(setUser(response.loadedUser));
				dispatch(setStatuses(response.loadedStatuses));
				dispatch(RESET_AUTH_AND_REG_FORM);
			}
		});
	};

	const errorMessage = validationError || serverError;

	if (userLogin) {
		return (
			<Form className={styles.exit} title={userLogin}>
				<Button type="button" onClick={() => dispatch(logout(userSession))}>
					Выйти
				</Button>
			</Form>
		);
	}

	return (
		<Form
			className={styles.auth}
			title={isReg ? 'Регистрация:' : 'Авторизация:'}
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

			{isReg && (
				<Input
					id="repeatPassword"
					type="password"
					name="repeatPassword"
					label="Повтор пароля:"
					value={repeatPasswordValue}
					onChange={onRepeatPasswordChange}
					onBlur={onRepeatPasswordCheck}
				/>
			)}

			<Button type="submit" disabled={validationError}>
				{isReg ? 'Отправить' : 'Войти'}
			</Button>

			{!isReg && (
				<div className={styles.regBlock}>
					или{' '}
					<Link
						to="/register"
						onClick={() => dispatch(RESET_AUTH_AND_REG_FORM_ERROR)}
					>
						Зарегестрироваться
					</Link>
				</div>
			)}
		</Form>
	);
};
