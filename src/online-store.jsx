// npm run server
// npm start

// import { server } from './bff';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { AuthorizeAndRegister } from './pages';
import styles from './online-store.module.css';

// server.authorize('ASPiRe_Gray ', '123');
// server.authorize('ASPiRe_Gray', '123 ');
// server.authorize('ASPiRe_Gray', '123');
// server.register('ASPiRe_Gray', '123');

// server.register('Ivan', '123');

const Content = ({ children }) => <div>{children}</div>;
const Main = () => (
	<main>
		<h1>Main page</h1>
		<h2>Main page</h2>
	</main>
);

export const OnlineStore = () => {
	return (
		<div className={styles.onlineStore}>
			<h1>"Сельхоззапчасть" - Интернет-магазин сельхоззапчастей.</h1>
			<Content>
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
			</Content>
		</div>
	);
};
