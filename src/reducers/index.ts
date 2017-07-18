import { Reducer, combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

import * as fromAuth from './auth';
import * as fromTours from './tours';
import * as fromPeople from './people';

const routeReducer = routerReducer as Reducer<RouterState>;

export const rootReducer = combineReducers<TState>({
  auth: fromAuth.reducer,  
  routing: routeReducer,
  tours: fromTours.reducer,
  people: fromPeople.reducer
});

export const getProfile = (state: TState) => fromAuth.getProfile(state.auth);
export const getIdToken = (state: TState) => fromAuth.getIdToken(state.auth);

export const getTours = (state: TState) => fromTours.getAll(state.tours);
export const isLoadingTours = (state: TState) => fromTours.isLoading(state.tours);
export const areToursLoaded = (state: TState) => fromTours.areLoaded(state.tours);

export const getPeople = (state: TState) => fromPeople.getAll(state.people);
export const isLoadingPeople = (state: TState) => fromPeople.isLoading(state.people);
export const arePeopleLoaded = (state: TState) => fromPeople.areLoaded(state.people);