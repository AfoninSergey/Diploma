import { Button } from '../../../../components';
import { getCombineName } from '../../../../utils';
import styles from './part-item.module.css';

export const PartItem = ({
	imageUrl,
	article,
	name,
	price,
	combineId,
	combines,
}) => (
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
						ЦЕНА: <b>{price}</b> с НДС
					</div>
				</div>

				<Button addClass="smallButton">Перейти</Button>
			</div>
		</div>
	</li>
);
