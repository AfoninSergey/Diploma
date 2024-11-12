import { Link } from 'react-router-dom';
import styles from './admin-panel.module.css';
import { Button } from '../../../button/button';

export const AdminPanel = () => (
	<div className={styles.adminPanel}>
		<div className={styles.editButtons}>
			<Link to="/add" className={styles.add} title='Добавить запчасть'>
				<img src="./pictures/icons/add.png" alt="add" width={112} />
			</Link>
			<Link to="/edit" className={styles.edit} title='Редактировать запчасти'>
				<img src="./pictures/icons/edit.png" alt="edit" width={112} />
			</Link>
			<Link to="/users" className={styles.edit} title='Список клиентов'>
				<img src="./pictures/icons/users.png" alt="users" width={112} />
			</Link>
		</div>

		<Button type="button">Выйти</Button>
	</div>
);
