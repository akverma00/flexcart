import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import data from '../data';

const initialState = {};
// eslint-disable-next-line no-unused-vars
const reducer = (state, action) => {
    return { products: data.products };
};

//Added to view in chrome in dev. tools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
