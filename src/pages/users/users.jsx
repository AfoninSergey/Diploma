import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form } from '../../components';
import { UserItem, UsersTitle } from './components';
import { selectStatuses } from '../../selectors';
import styles from './users.module.css';
import { getUsers } from '../../bff/api/get-users';

export const Users = () => {
	const statuses = useSelector(selectStatuses);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const loadedUsers = getUsers();
		loadedUsers.then((loadedUsers) => setUsers(loadedUsers));
	}, []);

	return (
		<Form title="Клиенты:" className={styles.users}>
			<UsersTitle />

			{users.map(({ id, login, statusId, amount }, i) => (
				<UserItem
					key={id}
					num={i + 1}
					login={login}
					statusId={statusId}
					amount={amount}
					statuses={statuses}
				/>
			))}
		</Form>
	);
};
