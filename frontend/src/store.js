import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer } from './reducers/productReducers'

const initialState = {};
// eslint-disable-next-line no-unused-vars
const reducer = combineReducers({
    productList: productListReducer,
});

//Added to view in chrome in dev. tools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
