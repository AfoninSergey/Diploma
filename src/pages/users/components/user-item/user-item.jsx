import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Select } from '../../../../components';
import {
	getAppropriateAmount,
	getAppropriateStatusId,
	getZeros,
} from '../../../../utils';
import {
	removeUserAsync,
	saveUserDataAsync,
	setServerError,
	UPDATE_USERS_TRIGGER,
} from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import { ERROR_MESSAGE } from '../../../../constants';
import styles from './user-item.module.css';

export const UserItem = ({
	userId,
	num,
	login,
	loadedStatusId,
	loadedAmount,
	statuses,
}) => {
	const [initialStatusId, setInitialStatusId] = useState(loadedStatusId);
	const [initialAmount, setInitialAmount] = useState(loadedAmount);
	const [userStatusId, setUserStatusId] = useState(initialStatusId);
	const [usersAmount, setUserAmount] = useState(initialAmount);

	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onUserStatusChange = ({ target: { value } }) => {
		setUserStatusId(+value);
		const appropriateAmount = getAppropriateAmount(statuses, +value);
		setUserAmount(getZeros(appropriateAmount));
		dispatch(setServerError(null));
	};

	const onUserAmountChange = ({ target: { value } }) => {
		value = value.replace(/[^0-9.,]/g, '').replace(',', '.');

		setUserAmount(value);

		const appropriateStatusId = getAppropriateStatusId(statuses, value);
		setUserStatusId(appropriateStatusId);
		dispatch(setServerError(null));
	};

	const onCancel = () => {
		setUserStatusId(initialStatusId);
		setUserAmount(initialAmount);
		dispatch(setServerError(null));
	};

	const onUserDataSave = () => {
		dispatch(setServerError(null));
		dispatch(
			saveUserDataAsync(requestServer, userId, userStatusId, usersAmount),
		).then(({ error, response }) => {
			if (error !== null) {
				dispatch(dispatch(setServerError(error)));
			} else if (
				response.amount === undefined ||
				response.statusId === undefined
			) {
				dispatch(setServerError(ERROR_MESSAGE.SERVER));
			} else {
				setInitialStatusId(response.statusId);
				setInitialAmount(getZeros(response.amount));
				setUserAmount(getZeros(response.amount));
			}
		});
	};

	const onUserDelete = () => {
		dispatch(setServerError(null));
		dispatch(removeUserAsync(requestServer, userId)).then(
			({ error, response }) => {
				if (error !== null) {
					dispatch(dispatch(setServerError(error)));
				} else if (!response) {
					dispatch(setServerError(ERROR_MESSAGE.SERVER));
				} else {
					dispatch(UPDATE_USERS_TRIGGER)
				}
			},
		);
	};

	const isCancelButtonDisabled =
		(initialStatusId === userStatusId && +initialAmount === +usersAmount)
	const isSaveButtonDisabled =
		(initialStatusId === userStatusId && +initialAmount === +usersAmount) ||
		usersAmount.length === 0 ||
		isNaN(usersAmount);

	return (
		<div className={styles.usersItem}>
			<Input value={num} disabled className={styles.usersNum} />
			<Input disabled value={login} className={styles.usersLogin} />
			<Select
				value={userStatusId}
				className={styles.usersStatus}
				onChange={onUserStatusChange}
			>
				{statuses.map(({ id, name }) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</Select>
			<Input
				value={usersAmount}
				placeholder={initialAmount}
				className={styles.usersAmount}
				onChange={onUserAmountChange}
			/>
			<Button
				disabled={isCancelButtonDisabled}
				title="Отменить изменения"
				cancel
				onClick={onCancel}
			/>
			<Button
				disabled={isSaveButtonDisabled}
				title="Сохранить изменения"
				save
				onClick={onUserDataSave}
			/>
			<Button title="Удалить пользователя" del onClick={onUserDelete} />
		</div>
	);
};
