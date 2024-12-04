import { useDispatch, useSelector } from 'react-redux';
import { selectUserLogin, selectUserStatus } from '../../../../selectors';
import { Button } from '../../../button/button';
import styles from './user-panel.module.css';
import { LOGOUT, RESET_CART } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';

export const UserPanel = () => {
	const userLogin = useSelector(selectUserLogin);
	const userStatus = useSelector(selectUserStatus);

	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onLogout = () => {
		requestServer('logout');
		dispatch(LOGOUT);
		dispatch(RESET_CART);
		sessionStorage.removeItem('currentUserData');
		sessionStorage.removeItem('currentUserCartData');
		sessionStorage.removeItem('loadedStatuses');
	};

	return (
		<div className={styles.userPanel}>
			<div className={styles.userName}>{userLogin}</div>

			<div className={styles.userDiscount}>
				Ваша скидка: <b>{userStatus.discount}</b>%
			</div>
			<div className={styles.userRemain}>
				{userStatus.nextDiscount ? (
					<>
						<div className={styles.userRemainText}>
							До скидки <b>{userStatus.nextDiscount}</b>% осталось
							купить на:
						</div>
						<div className={styles.userRemainAmount}>
							{userStatus.remainAmount}
							<span>руб.</span>
						</div>
					</>
				) : (
					<div className={styles.vip}>vip</div>
				)}
			</div>
			<Button addClass="smallButton" onClick={onLogout}>
				Выйти
			</Button>
		</div>
	);
};
