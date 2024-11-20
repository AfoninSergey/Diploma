import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form /* Loader */, SearchPanel } from '../../components';
import { UserItem, UsersTitle } from './components';
import {
	selectAccessError,
	selectServerError,
	selectStatuses,
	selectUpdateUsersTrigger,
	selectUsers,
} from '../../selectors';
import { setAccessError, setUsers } from '../../actions';
import { ErrorPage } from '../error-page/error-page';
import {
	getCurrentSortingOrder,
	search,
	sortByAlphabet,
	sortByNumber,
} from '../../utils';
import { ERROR_MESSAGE, SORTING_ORDER } from '../../constants';
import styles from './users.module.css';
import { useServerRequest } from '../../hooks';


export const Users = () => {
	const statuses = useSelector(selectStatuses);
	const accessError = useSelector(selectAccessError);
	const users = useSelector(selectUsers);
	const serverError = useSelector(selectServerError);
	const trigger = useSelector(selectUpdateUsersTrigger)

	const [usersToDisplay, setUsersToDisplay] = useState(users);
	const [searchString, setSearchString] = useState('');
	const [amountSortingOrder, setAmountSortingOrder] = useState(
		SORTING_ORDER.NOT_APPLIED,
	);
	const [alphabetSortingOrder, setAlphabetSortingOrder] = useState(
		SORTING_ORDER.NOT_APPLIED,
	);

	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	useEffect(() => {
		console.log('useEffect')
		requestServer('fetchUsers').then((loadedUsers) => {
			dispatch(setAccessError(loadedUsers.error));

			if (!accessError && loadedUsers.response !== null) {
				dispatch(setUsers(loadedUsers.response));
				setUsersToDisplay(loadedUsers.response);
			}
		});
	}, [requestServer, dispatch, accessError, trigger]);

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

		if (searchString.length !== 0) {
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

		if (searchString.length !== 0) {
			sortedUsers = search(sortedUsers, searchString, 'login');
		}

		setUsersToDisplay(sortedUsers);
	};

	// return (<Loader/>) TODO

	if (accessError) return <ErrorPage>{accessError}</ErrorPage>;

	const errorMessage =
		usersToDisplay.length === 0 ? ERROR_MESSAGE.NO_USERS_FOUND : serverError;

	return (
		<section className={styles.users}>
			<SearchPanel value={searchString} onChange={onSearchString}>
				<Button small sort={alphabetSortingOrder} onClick={onAlphabetSort}>
					По алфавиту
				</Button>
				<Button small sort={amountSortingOrder} onClick={onAmountSort}>
					По сумме
				</Button>
			</SearchPanel>
			<Form
				title="Клиенты:"
				className={styles.usersForm}
				errorMessage={errorMessage}
			>
				{usersToDisplay.length !== 0 && <UsersTitle />}

				{usersToDisplay.map(({ id, login, statusId, amount }, i) => (
					<UserItem
						key={id}
						userId={id}
						num={i + 1}
						login={login}
						loadedStatusId={statusId}
						loadedAmount={amount}
						statuses={statuses}
					/>
				))}
			</Form>
		</section>
	);
};
