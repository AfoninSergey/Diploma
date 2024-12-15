import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from '../../components';

import {
	LOGOUT,
	setLoginValue,
	setPasswordValue,
	setValidationError,
	setRepeatPasswordValue,
	RESET_AUTH_AND_REG_FORM_ERROR,
	RESET_CART,
	authorizeOrRegisterAsync,
	setIsLoading,
} from '../../actions';
import {
	selectUserLogin,
	selectLoginValue,
	selectServerError,
	selectPasswordValue,
	selectValidationError,
	selectRepeatPasswordValue,
} from '../../selectors';
import {
	validateLogin,
	validatePassword,
	validateRepeatPassword,
	validateSubmitData,
} from '../../utils';
import styles from './authorize-and-register.module.css';
import { useServerRequest } from '../../hooks';

export const AuthorizeAndRegister = () => {
	const loginValue = useSelector(selectLoginValue);
	const passwordValue = useSelector(selectPasswordValue);
	const repeatPasswordValue = useSelector(selectRepeatPasswordValue);
	const serverError = useSelector(selectServerError);
	const validationError = useSelector(selectValidationError);
	const userLogin = useSelector(selectUserLogin);

	const isReg = !!useMatch('/register');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	const onLogout = () => {
		requestServer('logout');
		dispatch(LOGOUT);
		dispatch(RESET_CART);
		sessionStorage.removeItem('currentUserData');
		sessionStorage.removeItem('currentUserCartData');
		sessionStorage.removeItem('loadedStatuses');
	};

	const onLoginChange = ({ target: { value } }) => {
		dispatch(setLoginValue(value));
		const newError = validateLogin(value) || validatePassword(passwordValue);
		dispatch(setValidationError(newError));
	};

	const onPasswordChange = ({ target: { value } }) => {
		dispatch(setPasswordValue(value));
		const newError = validatePassword(value) || validateLogin(loginValue);
		dispatch(setValidationError(newError));
	};

	const onRepeatPasswordChange = ({ target: { value } }) => {
		dispatch(setRepeatPasswordValue(value));
		const newError =
			validatePassword(passwordValue) || validateLogin(loginValue);
		dispatch(setValidationError(newError));
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
			) ||
			validateRepeatPassword(passwordValue, repeatPasswordValue, isReg);

		if (newError) {
			dispatch(setValidationError(newError));
			return;
		}

		dispatch(setIsLoading(true))
		dispatch(
			authorizeOrRegisterAsync(
				requestServer,
				isReg,
				loginValue,
				passwordValue,
			),
		).then(({ successfully }) => {
			if (successfully) {
				navigate('/');
				dispatch(setIsLoading(false))
			}
		});
	};

	const errorMessage = validationError || serverError;

	if (userLogin) {
		return (
			<Form className={styles.exit} title={userLogin}>
				<Button onClick={onLogout}>Выйти</Button>
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
