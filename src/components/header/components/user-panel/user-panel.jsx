import { useDispatch, useSelector } from 'react-redux';
import {
	selectUserLogin,
	selectUserSession,
	selectUserStatus,
} from '../../../../selectors';
import { Button } from '../../../button/button';
import styles from './user-panel.module.css';
import { logout } from '../../../../actions';

export const UserPanel = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector(selectUserLogin);
	const userStatus = useSelector(selectUserStatus);
	const userSession = useSelector(selectUserSession);

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
			<Button
				small
				type="button"
				onClick={() => dispatch(logout(userSession))}
			>
				Выйти
			</Button>
		</div>
	);
};
