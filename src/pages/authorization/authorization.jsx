import { Button, Input } from '../../components';
import styles from './authorization.module.css';
export const Authorization = () => {
	
	return (
		<div className={styles.authorization}>
			<h2>Авторизация:</h2>
			<form>
				<label htmlFor="login">Логин:</label>
				<Input type="text" name="login" id="login" />
				<label htmlFor="password">Пароль:</label>
				<Input type="password" name="password" id="password" />
				<Button type="submit">Отправить</Button>
			</form>
		</div>
	);
};
