import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	cartReducer,
	combinesRducer,
	partsReducer,
	statusesReduser,
	userReduser,
	usersRsducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	cart: cartReducer,
	combine: combinesRducer,
	parts: partsReducer,
	user: userReduser,
	users: usersRsducer,
	statuses: statusesReduser,
});

export const store = createStore(reducer, applyMiddleware(thunk));
