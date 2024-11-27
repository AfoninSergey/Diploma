import { useSelector } from 'react-redux';
import { Button } from '../../../../components';
import { getCombineName, getDiscountedPrice } from '../../../../utils';
import styles from './part-item.module.css';
import { selectUserStatus } from '../../../../selectors';

export const PartItem = ({
	imageUrl,
	article,
	name,
	price,
	combineId,
	combines,
}) => {
	const userStatus = useSelector(selectUserStatus);
	
	return (
		<li className={styles.part}>
			<div className={styles.partImage}>
				{imageUrl && <img src={imageUrl} alt={article} />}
			</div>
			<div className={styles.partContent}>
				<div className={styles.partTitle}>
					<span className={styles.partName}>{name}</span>
					<b>"{getCombineName(combines, combineId)}"</b>
				</div>
				<div className={styles.partBottom}>
					<div className={styles.partArticleAndPrice}>
						<div>
							<b>Артикул:</b> {article}
						</div>
						<div className={styles.partPrice}>
							{userStatus?.discount && userStatus?.discount !== 0 ? (
								<span>
									ЦЕНА: <del>{price}</del>{' '}
									<b className={styles.discount}>
										{getDiscountedPrice(price, userStatus.discount)}
									</b>{' '}
									с НДС
									<i> (Скидка {userStatus.discount}%)</i>
								</span>
							) : (
								<span>
									ЦЕНА: <b>{price}</b> с НДС
								</span>
							)}
						</div>
					</div>

					<Button addClass="smallButton">Перейти</Button>
				</div>
			</div>
		</li>
	);
};
