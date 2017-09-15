import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import { history } from '../history';
import { rootReducer } from '../reducers';

const configureStore = (preloadedState: Partial<TState>) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, routerMiddleware(history))
);

export default configureStore;