import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import * as fromByCode from './byCode';
import * as fromInfo from './info';
import * as fromAll from './all';

export const reducer = combineReducers<TToursState>({
  all: fromAll.reducer,
  byCode: fromByCode.reducer,
  info: fromInfo.reducer
});

export const isLoading = (state: TToursState) => fromInfo.isLoading(state.info);
export const areLoaded = (state: TToursState) => fromInfo.areLoaded(state.info);

export const getAll = (state: TToursState) => createSelector(
  (tourState: TToursState) => fromAll.getIds(tourState.all),
  (tourState: TToursState) => fromByCode.byId(tourState.byCode),
  (ids: string[], byId: {[id: string]: TTour}) => ids.map(id => byId[id])
)(state);
