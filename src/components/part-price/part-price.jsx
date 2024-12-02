import { useSelector } from 'react-redux';
import { selectUserStatus } from '../../selectors';
import { getDiscountedPrice, getZeros } from '../../utils';
import styles from './part-price.module.css';

export const PartPrice = ({ addClass, price, title }) => {
	const userStatus = useSelector(selectUserStatus);
	return (
		<div className={`${styles.partPrice} ${styles[addClass]}`}>
			{userStatus?.discount && userStatus?.discount !== 0 ? (
				<span>
					{title} <del>{getZeros(price)}</del>{' '}
					<b className={styles.discount}>
						{getDiscountedPrice(price, userStatus.discount)}
					</b>р. с НДС
					<i> (Скидка {userStatus.discount}%)</i>
				</span>
			) : (
				<span>
					ЦЕНА: <b>{price}</b> с НДС
				</span>
			)}
		</div>
	);
};
