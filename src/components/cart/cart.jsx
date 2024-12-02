import { useSelector } from 'react-redux';
import styles from './cart.module.css';
import { selectTotalAmount, selectTotalNumber } from '../../selectors';

export const Cart = () => {
	const totalNumber = useSelector(selectTotalNumber);
	const totalAmount = useSelector(selectTotalAmount);
	return (
		<div className={styles.cart}>
			<img
				src="../pictures/icons/cart.png"
				alt="Cart"
				width={141}
				height={141}
			/>
			<div className={styles.content}>
				<div className={styles.totalNumber}>
					Итого: <b>{totalNumber}</b> шт.
				</div>

				<div className={styles.totalAmount}>
					Общая сумма: <b>{totalAmount}</b> р. с НДС
				</div>
			</div>
		</div>
	);
};
