import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import * as fromByCode from './byCode';
import * as fromInfo from './info';
import * as fromAll from './all';

export const reducer = combineReducers<TPeopleState>({
  all: fromAll.reducer,
  byCode: fromByCode.reducer,
  info: fromInfo.reducer
});

export const isLoading = (state: TPeopleState) => fromInfo.isLoading(state.info);
export const areLoaded = (state: TPeopleState) => fromInfo.areLoaded(state.info);

export const getAll = (state: TPeopleState) => createSelector(
  (tourState: TPeopleState) => fromAll.getIds(tourState.all),
  (tourState: TPeopleState) => fromByCode.byId(tourState.byCode),
  (ids: string[], byId: {[id: string]: TPerson}) => ids.map(id => byId[id])
)(state);
