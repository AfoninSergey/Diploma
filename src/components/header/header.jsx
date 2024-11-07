import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { Button } from '../button/button';
import { AdminPanel, Logo } from './components';

export const Header = () => (
	<header className={styles.header}>
		<Logo />
		<AdminPanel/>
		<Link to="/login">
			<Button type="button">Вход</Button>
		</Link>
	</header>
);
