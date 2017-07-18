import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import * as fromByCode from './byCode';
import * as fromInfo from './info';
import * as fromAll from './all';

export const reducer = combineReducers<TRoutesStates>({
  all: fromAll.reducer,
  byCode: fromByCode.reducer,
  info: fromInfo.reducer
});

export const isLoading = (state: TRoutesStates) => fromInfo.isLoading(state.info);
export const areLoaded = (state: TRoutesStates) => fromInfo.areLoaded(state.info);

export const getAll = (state: TRoutesStates) => createSelector(
  (routesState: TRoutesStates) => fromAll.getIds(routesState.all),
  (routesState: TRoutesStates) => fromByCode.byId(routesState.byCode),
  (ids: string[], byId: { [id: string]: TRoute }) => ids.map(id => byId[id])
)(state);
