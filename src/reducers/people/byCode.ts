import { combineReducers } from 'redux';

const byIdReducer = (state: { [id: string]: TTour } = {}, action: TActions) => {
  switch (action.type) {
    case 'PERSON_LOAD_SUCCESS':
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

export const reducer = combineReducers<TByCodeState<TPerson>>({
  byId: byIdReducer
});

export const byId = (state: TByCodeState<TPerson>) => state.byId;