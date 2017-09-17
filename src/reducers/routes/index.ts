import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import * as fromAdd from './add';
import * as fromByCode from './byCode';
import * as fromInfo from './info';
import * as fromAll from './all';

export const reducer = combineReducers<TRoutesStates>({
  add: fromAdd.reducer,
  all: fromAll.reducer,
  byCode: fromByCode.reducer,
  info: fromInfo.reducer
});

export const isLoading = (state: TRoutesStates) => fromInfo.isLoading(state.info);
export const areLoaded = (state: TRoutesStates) => fromInfo.areLoaded(state.info);
export const getAddTemplate = (state: TRoutesStates) => fromAdd.getAddTemplate(state.add);
export const getAddState = (state: TRoutesStates) => fromAdd.getAddState(state.add);

export const get = (state: TRoutesStates, routeId: string): TRoute | undefined =>
  fromByCode.byId(state.byCode)[routeId];
export const getAll = (state: TRoutesStates) => createSelector(
  (routesState: TRoutesStates) => fromAll.getIds(routesState.all),
  (routesState: TRoutesStates) => fromByCode.byId(routesState.byCode),
  (ids: string[], byId: { [id: string]: TRoute }) => ids.map(id => byId[id])
)(state);
