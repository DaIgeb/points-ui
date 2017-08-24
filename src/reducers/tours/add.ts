import { combineReducers } from 'redux';

const addTemplateReducer = (state: Partial<TTourCreate> = {}, action: TActions) => {
  switch (action.type) {
    case 'TOUR_STORE_ADD':
      return {
        ...state,
        ...action.payload
      };
    case 'TOUR_ADD_SUCCESS':
      return {};
    default:
      return state;
  }
};

const addStateReducer = (state: TAddStates = 'editing', action: TActions): TAddStates => {
  switch (action.type) {
    case 'TOUR_STORE_ADD':
      return 'editing';
    case 'TOUR_ADD_SUCCESS':
      return 'success';
    case 'TOUR_STORE_ADDING':
      return 'adding';
    default:
      return state;
  }
};

export const reducer = combineReducers<TAddState<TTourCreate>>({
  state: addStateReducer,
  template: addTemplateReducer
});

export const getAddTemplate = (state: TAddState<TTourCreate>) => state.template;
export const getAddState = (state: TAddState<TTourCreate>) => state.state;
