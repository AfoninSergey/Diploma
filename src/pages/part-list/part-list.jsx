import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, InfoBlock, Pagination, SearchPanel } from '../../components';
import styles from './part-list.module.css';
import { selectCombines, selectParts } from '../../selectors';
import { getCurrentSortingOrder, getPaginationData, search, sortByNumber } from '../../utils';
import { MAX_ITEMS, SORTING_ORDER } from '../../constants';
import { PartItem, PartTitle } from './components';

export const PartList = () => {
	const parts = useSelector(selectParts);
	const combines = useSelector(selectCombines);

	const [currentPage, setCurrentPage] = useState(1);
	const [partsToDisplay, setPartsToDisplay] = useState(parts);
	const [searchString, setSearchString] = useState('');
	const [priceSortingOrder, setPriceSortingOrder] = useState(
		SORTING_ORDER.NOT_APPLIED,
	);

	useEffect(() => {
		setPartsToDisplay(parts);
	}, [parts]);

	const onPriceSort = () => {
		console.log('onPriceSort');
		const currentSortingOrder = getCurrentSortingOrder(
			priceSortingOrder,
			setPriceSortingOrder,
		);

		let sortedParts = sortByNumber(currentSortingOrder, parts, 'price');

		if (searchString.length !== 0) {
			sortedParts = search(sortedParts, searchString, 'name');
		}

		setPartsToDisplay(sortedParts);
	};

	const onSearchString = ({ target: { value } }) => {
		setSearchString(value);

		let foundParts = search(parts, value, 'name');

		if (priceSortingOrder !== SORTING_ORDER.NOT_APPLIED) {
			foundParts = sortByNumber(priceSortingOrder, foundParts, 'price');
		}

		setPartsToDisplay(foundParts);
	};


	const {
		list: partsList,
		isPagination,
		totalPages,
	} = getPaginationData(partsToDisplay, MAX_ITEMS.EDIT_PAGE_PARTS, currentPage);
	return (
		<div className={styles.partList}>
			<SearchPanel
				placeholder="Поиск запчастей по наименованию..."
				value={searchString}
				onChange={onSearchString}
			>
				<Button
					addClass="smallButton"
					sort={priceSortingOrder}
					onClick={onPriceSort}
				>
					По стоимости
				</Button>
			</SearchPanel>
			<div className={styles.parts}>
				{partsList.length === 0 && (
					<InfoBlock>
						Запчасти не найдены...
					</InfoBlock>
				)}
				{partsList.length !== 0 && (
					<Form
						title="Редактировать:"
						className={styles.editPartsForm}
						// errorMessage={errorMessage}
					>
						{partsList.length !== 0 && <PartTitle />}
						{partsList.map(
							({
								id,
								imageUrl,
								article,
								name,
								price,
								quantity,
								combineId,
							}) => (
								<PartItem
									key={id}
									partId={id}
									loadedArticle={article}
									loadedName={name}
									loadedQuantity={quantity}
									loadedPrice={price}
									loadedImageUrl={imageUrl}
									loadedCombineId={combineId}
									combines={combines}
								/>
							),
						)}
					</Form>
				)}
					{isPagination && (
							<Pagination
								page={currentPage}
								lastPage={totalPages}
								setCurrentPage={setCurrentPage}
							/>
						)}
			</div>
		</div>
	);
};
