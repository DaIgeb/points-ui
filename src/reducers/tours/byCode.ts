import { combineReducers } from 'redux';

const byIdReducer = (state: { [id: string]: TTour } = {}, action: TActions) => {
  switch (action.type) {
    case 'TOURS_LOAD_SUCCESS':
      return action.payload.reduce(
        (prev, cur) => ({
          ...prev,
          [cur.id]: cur
        }),
        {}
      );
    case 'TOUR_ADD_SUCCESS': {
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    }
    default:
      return state;
  }
};

export const reducer = combineReducers<TByCodeState<TTour>>({
  byId: byIdReducer
});

export const byId = (state: TByCodeState<TTour>) => state.byId;
export const get = (state: TByCodeState<TTour>, id: string): TTour | undefined => state.byId[id];