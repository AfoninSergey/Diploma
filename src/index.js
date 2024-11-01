import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { OnlineStore } from './online-store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<OnlineStore />
	</React.StrictMode>,
);
