import { Link } from 'react-router-dom';
import { Button, PartPrice } from '../../../../components';
import { getCombineName } from '../../../../utils';
import styles from './part-item.module.css';

export const PartItem = ({
	id,
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
					<PartPrice price={price} title="ЦЕНА:" />
				</div>

				<Link to={`/part/${id}`}>
					<Button addClass="smallButton">Перейти</Button>
				</Link>
			</div>
		</div>
	</li>
);
