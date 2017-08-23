import { combineReducers } from 'redux';

const addTemplateReducer = (state: Partial<TRouteCreate> = {}, action: TActions) => {
  switch (action.type) {
    case 'ROUTE_STORE_ADD':
      return {
        ...state,
        ...action.payload
      };
    case 'ROUTE_ADD_SUCCESS':
      return {};
    default:
      return state;
  }
};

const addStateReducer = (state: TAddStates = 'editing', action: TActions): TAddStates => {
  switch (action.type) {
    case 'ROUTE_STORE_ADD':
      return 'editing';
    case 'ROUTE_ADD_SUCCESS':
      return 'success';
    case 'ROUTE_STORE_ADDING':
      return 'adding';
    default:
      return state;
  }
};

export const reducer = combineReducers<TAddState<TRouteCreate>>({
  state: addStateReducer,
  template: addTemplateReducer
});

export const getAddTemplate = (state: TAddState<TRouteCreate>) => state.template;
export const getAddState = (state: TAddState<TRouteCreate>) => state.state;
