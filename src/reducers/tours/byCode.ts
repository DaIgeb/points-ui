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
    default:
      return state;
  }
};

export const reducer = combineReducers<TByCodeState<TTour>>({
  byId: byIdReducer
});

export const byId = (state: TByCodeState<TTour>) => state.byId;