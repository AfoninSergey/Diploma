import { Link } from 'react-router-dom';
import styles from './logo.module.css';

export const Logo = () => (
	<Link to="/" className={styles.logo}>
		<img
			src="./pictures/logo/Logo.png"
			alt="'Сельхоззапчасть' - Интернет-магазин сельхоззапчастей"
			width={473}
			height={176}
		/>
	</Link>
);
