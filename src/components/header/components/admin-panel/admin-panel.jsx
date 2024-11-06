import { Link } from 'react-router-dom';
import styles from './admin-panel.module.css';

export const AdminPanel = () => (
	<div className={styles.adminPanel}>
		<Link to="/add" className={styles.add}>
			<img src="./pictures/icons/add.png" alt="" width={112} />
		</Link>
		<Link to="/edit" className={styles.edit}>
			<img src="./pictures/icons/edit.png" alt="" width={112} />
		</Link>
	</div>
);
