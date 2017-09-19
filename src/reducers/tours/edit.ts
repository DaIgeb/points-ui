import { combineReducers } from 'redux';

const addTemplateReducer = (state: Partial<TTourCreate> = {}, action: TActions) => {
  switch (action.type) {
    case 'TOUR_STORE_EDIT':
      return {
        ...state,
        ...action.payload.patch
      };
    case 'TOUR_SAVE_SUCCESS':
      return {};
    default:
      return state;
  }
};

const addStateReducer = (state: TEditStates = 'editing', action: TActions): TEditStates => {
  switch (action.type) {
    case 'TOUR_STORE_EDIT':
      return 'editing';
    case 'TOUR_SAVE_SUCCESS':
      return 'success';
    case 'TOUR_STORE_SAVING':
      return 'saving';
    default:
      return state;
  }
};

export const reducer = combineReducers<TEditState<TTourCreate>>({
  state: addStateReducer,
  template: addTemplateReducer
});

export const getEditTemplate = (state: TEditState<TTourCreate>) => state.template;
export const getEditState = (state: TEditState<TTourCreate>) => state.state;
