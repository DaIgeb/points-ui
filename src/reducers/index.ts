import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { auth } from './auth';

export const rootReducer = combineReducers<TState>({
  auth,
  routing: routerReducer
});
