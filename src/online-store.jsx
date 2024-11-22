import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { AuthorizeAndRegister, Main, Users } from './pages';
import styles from './online-store.module.css';

export const OnlineStore = () => (
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
			<Route
				path="/parts"
				element={
					<div>
						<h2>Part list</h2>
					</div>
				}
			/>
			<Route
				path="/part/:id"
				element={
					<div>
						<h2>Part</h2>
					</div>
				}
			/>
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
