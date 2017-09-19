import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import * as moment from 'moment';

import * as fromAdd from './add';
import * as fromByCode from './byCode';
import * as fromEdit from './edit';
import * as fromInfo from './info';
import * as fromAll from './all';

export const reducer = combineReducers<TToursState>({
  add: fromAdd.reducer,
  all: fromAll.reducer,
  byCode: fromByCode.reducer,
  info: fromInfo.reducer,
  edit: fromEdit.reducer
});

export const isLoading = (state: TToursState) => fromInfo.isLoading(state.info);
export const areLoaded = (state: TToursState) => fromInfo.areLoaded(state.info);
export const getAddTemplate = (state: TToursState) => fromAdd.getAddTemplate(state.add);
export const getAddState = (state: TToursState) => fromAdd.getAddState(state.add);
export const getEditTemplate = (state: TToursState) => fromEdit.getEditTemplate(state.edit);
export const getEditState = (state: TToursState) => fromEdit.getEditState(state.edit);
export const get = (state: TToursState, id: string) => fromByCode.get(state.byCode, id);

type TYearSelection = {
  state: TToursState;
  year: number;
};
export const forYear = (state: TToursState, year: number) => createSelector(
  (args: TYearSelection) => getAll(args.state),
  (args: TYearSelection) => args.year,
  (all: TTour[], selectedYear: number) => all.filter(t => moment(t.date).year() === selectedYear)
)({ state, year });
export const getAll = (state: TToursState) => createSelector(
  (tourState: TToursState) => fromAll.getIds(tourState.all),
  (tourState: TToursState) => fromByCode.byId(tourState.byCode),
  (ids: string[], byId: { [id: string]: TTour }) => ids.map(id => byId[id])
)(state);
