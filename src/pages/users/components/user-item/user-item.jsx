import { Button, Input, Select } from '../../../../components';
import styles from './user-item.module.css';

export const UserItem = ({ num, login, statusId, amount, statuses }) => (
	<div className={styles.usersItem}>
		<Input value={num} disabled className={styles.usersNum} />
		<Input disabled value={login} className={styles.usersLogin} />
		<Select value={statusId} className={styles.usersStatus}>
			{statuses.map(({ id, name }) => (
				<option key={id} value={id}>
					{name}
				</option>
			))}
		</Select>
		<Input value={amount} className={styles.usersAmount} />
		<Button type="button" title="Отменить изменения" cancel />
		<Button type="button" title="Сохранить изменения" save />
		<Button type="button" title="Удалить пользователя" del />
	</div>
);
