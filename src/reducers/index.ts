import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as fromAuth from './auth';
import * as fromTours from './tours';

export const rootReducer = combineReducers<TState>({
  auth: fromAuth.reducer,  
  routing: routerReducer,
  tours: fromTours.reducer
});

export const getProfile = (state: TState) => fromAuth.getProfile(state.auth);
export const getIdToken = (state: TState) => fromAuth.getIdToken(state.auth);

export const getTours = (state: TState) => fromTours.getAll(state.tours);
export const isLoadingTours = (state: TState) => fromTours.isLoading(state.tours);
export const areToursLoaded = (state: TState) => fromTours.areLoaded(state.tours);