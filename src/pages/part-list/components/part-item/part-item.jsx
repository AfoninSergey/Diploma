import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Button, Input, Select } from '../../../../components';

// import {
// 	getAppropriateAmount,
// 	getAppropriateStatusId,
// 	getZeros,
// 	setNoScroll,
// } from '../../../../utils';
// import {
// 	openModal,
// 	removeUserAsync,
// 	saveUserDataAsync,
// 	setServerError,
// 	UPDATE_USERS_TRIGGER,
// } from '../../../../actions';
// import { useServerRequest } from '../../../../hooks';
// import { ERROR_MESSAGE } from '../../../../constants';
import styles from './part-item.module.css';

export const PartItem = ({
	partId,
	loadedArticle,
	loadedName,
	loadedQuantity,
	loadedPrice,
	loadedImageUrl,
	loadedCombineId,
	combines,
}) => {
	const [initialArticle, setInitialArticle] = useState(loadedArticle);
	const [article, setArticle] = useState(initialArticle);
	const [initialName, setInitialName] = useState(loadedName);
	const [name, setName] = useState(initialName);
	const [initialQuantity, setInitialQuantity] = useState(loadedQuantity);
	const [quantity, setQuantity] = useState(initialQuantity);
	const [initialPrice, setInitialPrice] = useState(loadedPrice);
	const [price, setPrice] = useState(initialPrice);
	const [initialImageUrl, setInitialImageUrl] = useState(loadedImageUrl);
	const [imageUrl, setImageUrl] = useState(initialImageUrl);
	const [initialCombineId, setInitialCombineId] = useState(loadedCombineId);
	const [combineId, setCombineId] = useState(initialCombineId);

	// const dispatch = useDispatch();
	// const requestServer = useServerRequest();

	const onArticleChange = ({ target: { value } }) => {
		setArticle(value);
	};
	const onArticleBlur = ({ target: { value } }) => {
		if (value === '') {
			setArticle(initialArticle);
		}
	};

	const onNameChange = ({ target: { value } }) => {
		setName(value);
	};
	const onNameBlur = ({ target: { value } }) => {
		if (value === '') {
			setName(initialName);
		}
	};

	const onQuantityChange = ({ target: { value } }) => {
		value = value.replace(/[^0-9]/g, '');

		if (value.indexOf('0') === 0) {
			value = quantity;
		}

		setQuantity(value);
	};
	const onIncrQuantity = () => {
		setQuantity(+quantity + 1);
	};
	const onDecrQuantity = () => {
		if (+quantity > 1) {
			setQuantity(quantity - 1);
		}
	};
	const onQuantityBlur = ({ target: { value } }) => {
		if (value === '') {
			setQuantity(initialQuantity);
		}
	};

	const onPriceChange = ({ target: { value } }) => {
		value = value.replace(/[^0-9.,]/g, '').replace(',', '.');
		setPrice(value);
	};
	const onPriceBlur = ({ target: { value } }) => {
		if (value === '') {
			setPrice(initialPrice);
		}
	};

	const onImageUrlChange = ({ target: { value } }) => {
		setImageUrl(value);
	};
	const onImageUrlBlur = ({ target: { value } }) => {
		if (value === '') {
			setImageUrl(initialImageUrl);
		}
	};

	const onCombineChange = ({ target: { value } }) => {
		setCombineId(value);
	};

	const onCancel = () => {
		setArticle(initialArticle);
		setName(initialName);
		setQuantity(initialQuantity);
		setPrice(initialPrice);
		setImageUrl(initialImageUrl);
		setCombineId(initialCombineId);
	};
	return (
		<div className={styles.partItem}>
			<Input
				className={styles.partArticle}
				value={article}
				placeholder={initialArticle}
				onChange={onArticleChange}
				onBlur={onArticleBlur}
			/>
			<Input
				className={styles.partName}
				value={name}
				placeholder={initialName}
				onChange={onNameChange}
				onBlur={onNameBlur}
			/>
			<div className={styles.partQuantity}>
				<Input
					value={quantity}
					placeholder={initialQuantity}
					onChange={onQuantityChange}
					onBlur={onQuantityBlur}
				/>
				<button
					type="button"
					className={styles.arrowUp}
					onClick={onIncrQuantity}
				>
					▲
				</button>
				<button
					type="button"
					className={styles.arrowDown}
					onClick={onDecrQuantity}
				>
					▼
				</button>
			</div>
			<Input
				className={styles.partPrice}
				value={price}
				placeholder={initialPrice}
				onChange={onPriceChange}
				onBlur={onPriceBlur}
			/>
			<Input
				className={styles.partImageUrl}
				value={imageUrl}
				placeholder={initialImageUrl}
				onChange={onImageUrlChange}
				onBlur={onImageUrlBlur}
			/>
			<Select
				className={styles.partCombine}
				value={combineId}
				onChange={onCombineChange}
			>
				{combines.map(({ id, name }) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</Select>
			<Button
				addClass="cancelButton"
				// disabled={isCancelButtonDisabled}
				title="Отменить изменения"
				onClick={onCancel}
			/>
			<Button
				addClass="saveButton"
				// disabled={isSaveButtonDisabled}
				title="Сохранить изменения"
				// onClick={onUserDataSave}
			/>
			<Button
				addClass="deleteButton"
				title="Удалить пользователя"
				// onClick={onOpenModal}
			/>
		</div>
	);
};
