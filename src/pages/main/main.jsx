import { Button, SearchPanel } from '../../components';
import styles from './main.module.css';

const combines = [
	{
		id: '01',
		name: 'Вектор',
	},
	{
		id: '02',
		name: 'ДОН-1500Б',
	},
	{
		id: '03',
		name: 'ДОН-680М',
	},
	{
		id: '04',
		name: 'Акрос',
	},
	{
		id: '05',
		name: 'ДОН-1500А',
	},
	{
		id: '06',
		name: 'Нива',
	},
	{
		id: '07',
		name: 'Торум',
	},
	{
		id: '08',
		name: 'Полесье',
	},
	{
		id: '09',
		name: 'Енисей',
	},
];
const test = true;

export const Main = () => {
	return (
		<div className={styles.main}>
			{/* <h2>Выберите комбайн или раскройте весь список запчастей</h2> */}

			<SearchPanel placeholder="Поиск по наименованию...">
				<Button>По стоимости</Button>
			</SearchPanel>
			{/* combinesAndParts */}
			{/* combinesOnly */}
			<main className={styles.combinesOnly}>
				<div className={styles.combines}>
					{combines.map(({ id, name }) => (
						<div className={`${styles.combine} ${id === '01' ?styles.active : ''}`}>
							<div className={styles.combineImage}>
								<img
									src={`./pictures/combines/${id}.jpg`}
									alt={`${test ? 'Фото комбайна' : ''} ${name}`}
								/>
							</div>
							<div className={styles.combineName}>
								{test  ? 'Комбайн ' : ''}"{name}"
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};
