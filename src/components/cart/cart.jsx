import { useSelector } from 'react-redux';
import styles from './cart.module.css';
import { selectCartTotalAmount, selectCartTotalNumber } from '../../selectors';

export const Cart = () => {
	const cartTotalNumber = useSelector(selectCartTotalNumber);
	const cartTotalAmount = useSelector(selectCartTotalAmount);
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
					Итого: <b>{cartTotalNumber}</b> шт.
				</div>

				<div className={styles.totalAmount}>
					Общая сумма: <b>{cartTotalAmount}</b> р. с НДС
				</div>
			</div>
		</div>
	);
};
