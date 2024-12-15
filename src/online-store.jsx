import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useServerRequest } from './hooks';
import {
	AuthorizeAndRegister,
	CartPage,
	Main,
	Part,
	PartList,
	Users,
} from './pages';
import { Header, Loader, Modal } from './components';
import {
	loadCombinesAsync,
	loadPartsAsync,
	setCart,
	setIsLoading,
	setStatuses,
	setUser,
} from './actions';
import styles from './online-store.module.css';

export const OnlineStore = () => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	useLayoutEffect(() => {
		Promise.all([
			dispatch(loadCombinesAsync(requestServer)),
			dispatch(loadPartsAsync(requestServer)),
		]).then(([combines, parts]) => {
			if (combines.length !== 0 && parts.length !== 0)
				dispatch(setIsLoading(false));
		});

		const currentUserDataJSON = sessionStorage.getItem('currentUserData');
		const loadedStatusesJSON = sessionStorage.getItem('loadedStatuses');
		const currentUserCartDataJSON =
			sessionStorage.getItem('currentUserCartData');

		if (currentUserDataJSON) {
			dispatch(setUser(JSON.parse(currentUserDataJSON)));
		}
		if (currentUserCartDataJSON) {
			dispatch(setCart(JSON.parse(currentUserCartDataJSON)));
		}
		if (loadedStatusesJSON) {
			dispatch(setStatuses(JSON.parse(loadedStatusesJSON)));
		}
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
				<Route path="/edit" element={<PartList />} />
				<Route path="/parts" element={<Main />} />
				<Route path="/part/:id" element={<Part />} />
				<Route path="/cart" element={<CartPage />} />
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
			<Loader />
			<Modal />
		</div>
	);
};
