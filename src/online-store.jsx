import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { AuthorizeAndRegister, Main, Part, Users } from './pages';
import styles from './online-store.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCombinesAsync, loadPartsAsync } from './actions';
import { useServerRequest } from './hooks';

export const OnlineStore = () => {
	const dispatch = useDispatch()
	const requestServer = useServerRequest()

	useEffect(() => {
		dispatch(loadCombinesAsync(requestServer));

		dispatch(loadPartsAsync(requestServer))
	}, [requestServer, dispatch]);

	return (
		<div className={styles.onlineStore}>
			<h1>"Сельхоззапчасть" - Интернет-магазин сельхоззапчастей.</h1>

			<Header />
			<Routes>
				<Route path="/" element={<Main />} />

				<Route
					path="/part"
					element={
						<div>
							<h2>New part</h2>
						</div>
					}
				/>
				<Route path="/parts" element={<Main />} />
				<Route path="/part/:id" element={<Part />} />
				<Route
					path="/cart"
					element={
						<div>
							<h2>Cart</h2>
						</div>
					}
				/>
				<Route path="/users" element={<Users />} />
				<Route path="/login" element={<AuthorizeAndRegister />} />
				<Route path="/register" element={<AuthorizeAndRegister />} />
				<Route
					path="/*"
					element={
						<div>
							<h2>Error</h2>
						</div>
					}
				/>
			</Routes>
		</div>
	);
};
