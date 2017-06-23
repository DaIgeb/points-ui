import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { counter } from './counter';
import { auth } from './auth';

export const rootReducer = combineReducers<TState>({
  counter,
  auth,
  routing: routerReducer
});
