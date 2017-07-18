import { combineReducers } from 'redux';

const byIdReducer = (state: { [id: string]: TRoute } = {}, action: TActions) => {
  switch (action.type) {
    case 'ROUTES_LOAD_SUCCESS':
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

export const reducer = combineReducers<TByCodeState<TRoute>>({
  byId: byIdReducer
});

export const byId = (state: TByCodeState<TRoute>) => state.byId;