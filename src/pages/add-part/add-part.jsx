import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Select } from '../../components';
import styles from './add-part.module.css';
import { selectCombines, selectServerError } from '../../selectors';
import { useState } from 'react';
import { ERROR_MESSAGE, INITIAL_PART_DATA } from '../../constants';
import { validateSubmitNewPartData } from '../../utils';
import { addNewPartAsync, setIsLoading, setServerError } from '../../actions';
import { useServerRequest } from '../../hooks';

export const AddPart = () => {
	const combines = useSelector(selectCombines);
	const serverError = useSelector(selectServerError);

	const [partData, setPartData] = useState(INITIAL_PART_DATA);
	const [validationError, setValidationError] = useState(null);
	const [successInfo, setSuccessInfo] = useState(null);
	const { article, name, quantity, price, imageUrl, combineId } = partData;

	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onPartDataChange = ({ target: { value, name } }) => {
		setSuccessInfo(null);
		dispatch(setServerError(null));
		if (name === 'quantity') {
			value =
				value.indexOf('0') === 0 ? quantity : value.replace(/[^0-9]/g, '');
		} else if (name === 'price') {
			value =
				value.indexOf('0') === 0
					? price
					: value.replace(/[^0-9.,]/g, '').replace(',', '.');
		}

		const changedPartData = { ...partData, [name]: value };
		setPartData(changedPartData);
		setValidationError(
			isNaN(changedPartData.price) ? ERROR_MESSAGE.PRICE_IS_NAN : null,
		);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const validateError = validateSubmitNewPartData(partData);

		if (validateError) {
			setValidationError(validateError);
			return;
		}
		dispatch(setIsLoading(true));
		dispatch(addNewPartAsync(requestServer, partData)).then(
			({ successfully }) => {
				if (successfully) {
					dispatch(setIsLoading(false));
					setPartData(INITIAL_PART_DATA);
					setSuccessInfo('УСПЕШНО!');
				}
			},
		);
	};

	const adminInfo = validationError || serverError || successInfo;

	return (
		<Form
			className={styles.add}
			title="Добавить запчасть:"
			errorMessage={adminInfo}
			onSubmit={onSubmit}
		>
			<Input
				className={styles.article}
				label="Артикул:"
				name="article"
				id="article"
				value={article}
				onInput={onPartDataChange}
			/>
			<Input
				className={styles.name}
				label="Наименование:"
				name="name"
				id="name"
				value={name}
				onChange={onPartDataChange}
			/>
			<div className={styles.data}>
				<div className={styles.quantity}>
					<Input
						label="Кол-во:"
						name="quantity"
						id="quantity"
						value={quantity}
						onChange={onPartDataChange}
					/>
					<button
						className={styles.arrowUp}
						type="button"
						name="quantity"
						value={+quantity + 1}
						onClick={onPartDataChange}
					>
						▲
					</button>
					<button
						className={styles.arrowDown}
						type="button"
						name="quantity"
						value={+quantity > 1 ? +quantity - 1 : quantity}
						onClick={onPartDataChange}
					>
						▼
					</button>
				</div>
				<div className={styles.price}>
					<Input
						label="Стоимость:"
						name="price"
						id="price"
						value={price}
						onChange={onPartDataChange}
					/>
				</div>
				<div className={styles.imageUrl}>
					<Input
						label="Фото (URL):"
						name="imageUrl"
						id="imageUrl"
						value={imageUrl}
						onChange={onPartDataChange}
					/>
				</div>
			</div>
			<div className={styles.partCombine}>
				<div className={styles.label}>Комбайн:</div>
				<Select
					name="combineId"
					value={combineId}
					onChange={onPartDataChange}
				>
					{combines.map(({ id, name }) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</Select>
			</div>
			<Button type="submit" disabled={validationError}>
				Добавить
			</Button>
		</Form>
	);
};
