import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { Button, Cart, Input, PartPrice } from '../../components';
import { getCombineName, getZeros, setNoScroll } from '../../utils';
import { selectCombines, selectPart } from '../../selectors';
import { PART_PLUG } from '../../constants';
import styles from './part.module.css';

export const Part = () => {
	const { id } = useParams();
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const combines = useSelector(selectCombines);
	const requestServer = useServerRequest

	const { imageUrl, article, name, combineId, quantity, price } = useSelector(
		selectPart(id),
	) || PART_PLUG;

	const [openImage, setOpenImage] = useState(false);
	const [quantityValue, setQuantityValue] = useState('1');

	const onOpenImage = () => {
		setOpenImage(!openImage);
		setNoScroll(!openImage);
	};

	const onQuantityValueChange = ({ target: { value } }) => {
		value = value.replace(/[^0-9]/g, '');

		if (value.indexOf('0') === 0) {
			value = quantityValue;
		}

		if (+value > quantity) {
			value = `${quantity}`;
		}

		setQuantityValue(value);
	};

	const onQuantityValueBlur = ({ target: { value } }) => {
		if (value === '') {
			setQuantityValue('1');
		}
	};

	const onIncrQuantity = () => {
		if (+quantityValue < quantity) {
			setQuantityValue(+quantityValue + 1);
		}
	};
	const onDecrQuantity = () => {
		console.log('+quantityValue', +quantityValue);

		if (+quantityValue > 1) {
			setQuantityValue(quantityValue - 1);
		}
	};

	const onAddToCart = () => {
		dispatch()
	}

	const combineName =
		combines.length !== 0 ? getCombineName(combines, combineId) : '';

	return (
		<div className={styles.part}>
			<Cart />

			<div className={styles.partBlock}>
				<div className={styles.leftSide}>
					<div
						className={`${styles.partImage} ${openImage ? styles.active : ''}`}
					>
						{imageUrl && (
							<img
								src={imageUrl}
								alt={article}
								onClick={onOpenImage}
							/>
						)}
					</div>
					<div className={styles.partArticle}>
						<b>Артикул: </b> {article}
					</div>
				</div>
				<div className={styles.rigtSide}>
					<div className={styles.partTitle}>
						<span className={styles.partName}>{name}</span>
						<b> "{combineName}"</b>
					</div>
					<div className={styles.partQuantity}>
						<Input
							className={styles.quantityBig}
							label={`В наличии: ${quantity}`}
							value={quantityValue}
							onChange={onQuantityValueChange}
							onBlur={onQuantityValueBlur}
						/>
						<button className={styles.arrowUp} onClick={onIncrQuantity}>
							▲
						</button>
						<button
							className={styles.arrowDown}
							onClick={onDecrQuantity}
						>
							▼
						</button>
						<div>Количество</div>
					</div>
					<PartPrice
						addClass="totalAmount"
						price={getZeros(+price * quantityValue)}
						title="Стоимость:"
					/>
					<div className={styles.partButtons}>
						<Button onClick={() => navigate(-1)}>НАЗАД</Button>
						<Button>Добавить в корзину</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
