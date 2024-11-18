import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form /* Loader */, SearchPanel } from '../../components';
import { UserItem, UsersTitle } from './components';
import {
	selectAccessError,
	selectStatuses,
	selectUsers,
	selectUserSession,
} from '../../selectors';
import { server } from '../../bff';
import { setAccessError, setUsers } from '../../actions';
// import { ErrorPage } from '../error-page/error-page';
import {
	getCurrentSortingOrder,
	search,
	sortByAlphabet,
	sortByNumber,
} from '../../utils';
import { SORTING_ORDER } from '../../constants';
import styles from './users.module.css';

export const Users = () => {
	const statuses = useSelector(selectStatuses);
	const userSession = useSelector(selectUserSession);
	const accessError = useSelector(selectAccessError);
	const users = useSelector(selectUsers);

	const [usersToDisplay, setUsersToDisplay] = useState(users);
	const [searchString, setSearchString] = useState('');
	const [amountSortingOrder, setAmountSortingOrder] = useState(
		SORTING_ORDER.NOT_APPLIED,
	);
	const [alphabetSortingOrder, setAlphabetSortingOrder] = useState(
		SORTING_ORDER.NOT_APPLIED,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		server.fetchUsers(userSession).then((loadedUsers) => {
			dispatch(setAccessError(loadedUsers.error));

			if (!accessError && loadedUsers.response !== null) {
				dispatch(setUsers(loadedUsers.response));
				setUsersToDisplay(loadedUsers.response);
			}
		});
	}, [userSession, dispatch, accessError]);

	const onSearchString = ({ target: { value } }) => {
		setSearchString(value);
		let foundUsers = search(users, value, 'login');

		if (alphabetSortingOrder !== SORTING_ORDER.NOT_APPLIED) {
			foundUsers = sortByAlphabet(alphabetSortingOrder, foundUsers, 'login');
		}

		if (amountSortingOrder !== SORTING_ORDER.NOT_APPLIED) {
			foundUsers = sortByNumber(amountSortingOrder, foundUsers, 'amount');
		}

		setUsersToDisplay(foundUsers);
	};

	const onAlphabetSort = () => {
		setAmountSortingOrder(SORTING_ORDER.NOT_APPLIED);
		const currentSortingOrder = getCurrentSortingOrder(
			alphabetSortingOrder,
			setAlphabetSortingOrder,
		);

		let sortedUsers = sortByAlphabet(currentSortingOrder, users, 'login');

		if (searchString.trim().length !== 0) {
			sortedUsers = search(sortedUsers, searchString, 'login');
		}

		setUsersToDisplay(sortedUsers);
	};

	const onAmountSort = () => {
		setAlphabetSortingOrder(SORTING_ORDER.NOT_APPLIED);

		const currentSortingOrder = getCurrentSortingOrder(
			amountSortingOrder,
			setAmountSortingOrder,
		);

		let sortedUsers = sortByNumber(currentSortingOrder, users, 'amount');

		if (searchString.trim().length !== 0) {
			sortedUsers = search(sortedUsers, searchString, 'login');
		}

		setUsersToDisplay(sortedUsers);
	};

	// return (<Loader/>) TODO

	// if (accessError) return <ErrorPage>{accessError}</ErrorPage>; TODO

	return (
		<section className={styles.users}>
			<SearchPanel value={searchString} onChange={onSearchString}>
				<Button
					type="button"
					small
					sort={alphabetSortingOrder}
					onClick={onAlphabetSort}
				>
					По алфавиту
				</Button>
				<Button
					type="button"
					small
					sort={amountSortingOrder}
					onClick={onAmountSort}
				>
					По сумме
				</Button>
			</SearchPanel>
			<Form title="Клиенты:" className={styles.usersForm}>
				<UsersTitle />

				{usersToDisplay.map(({ id, login, statusId, amount }, i) => (
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
