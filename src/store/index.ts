import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import defaultReducer from '../reducer';

const store = createStore(defaultReducer, applyMiddleware(thunk));

export default store;
