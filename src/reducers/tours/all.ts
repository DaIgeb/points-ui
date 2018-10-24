import { combineReducers } from 'redux';

const idsReducer = (state: string[] = [], action: TActions) => {
  switch (action.type) {
    case 'TOURS_LOAD_SUCCESS':
      return action.payload.map(t => t.id);
    case 'TOUR_ADD_SUCCESS':
      return [...state, action.payload.id];
    case 'TOUR_REMOVE_SUCCESS':
      return state.filter(id => id !== action.payload);
    default:
      return state;
  }
};

export const reducer = combineReducers<TAllState>({
  ids: idsReducer
});

export const getIds = (state: TAllState) => state.ids;
