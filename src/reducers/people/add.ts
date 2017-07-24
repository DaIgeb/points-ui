import { combineReducers } from 'redux';

const addTemplateReducer = (state: Partial<TPersonCreate> = {}, action: TActions) => {
  switch (action.type) {
    case 'PERSON_STORE_ADD':
      return {
        ...state,
        ...action.payload
      };
    case 'PERSON_ADD_SUCCESS':
      return {};
    default:
      return state;
  }
};

const addStateReducer = (state: TAddStates = 'editing', action: TActions): TAddStates => {
  switch (action.type) {
    case 'PERSON_STORE_ADD':
      return 'editing';
    case 'PERSON_ADD_SUCCESS':
      return 'success';
    case 'PERSON_STORE_ADDING':
      return 'adding';
    default:
      return state;
  }
};

export const reducer = combineReducers<TAddState<TPersonCreate>>({
  state: addStateReducer,
  template: addTemplateReducer
});

export const getAddTemplate = (state: TAddState<TPersonCreate>) => state.template;
export const getAddState = (state: TAddState<TPersonCreate>) => state.state;
