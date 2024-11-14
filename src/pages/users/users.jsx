import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form /* Loader */, SearchPanel } from '../../components';
import { UserItem, UsersTitle } from './components';
import {
	selectAccessError,
	selectStatuses,
	selectUsers,
	selectUserSession,
} from '../../selectors';
import styles from './users.module.css';
import { server } from '../../bff';
import { setAccessError, setUsers } from '../../actions';
// import { ErrorPage } from '../error-page/error-page';

export const Users = () => {
	const statuses = useSelector(selectStatuses);
	const userSession = useSelector(selectUserSession);
	const accessError = useSelector(selectAccessError);
	const users = useSelector(selectUsers);

	const dispatch = useDispatch();

	useEffect(() => {
		server.fetchUsers(userSession).then((loadedUsers) => {
			dispatch(setAccessError(loadedUsers.error));

			if (!accessError && loadedUsers.response !== null) {
				dispatch(setUsers(loadedUsers.response));
			}
		});
	}, [userSession, dispatch, accessError]);

	// return (<Loader/>) TODO

	// if (accessError) return <ErrorPage>{accessError}</ErrorPage>; TODO

	return (
		<section className={styles.users}>
			<SearchPanel>
				<Button type="button" small up>
					По сумме
				</Button>
				<Button type="button" small down>
					По алфавиту
				</Button>
			</SearchPanel>
			<Form title="Клиенты:" className={styles.usersForm}>
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
		</section>
	);
};
