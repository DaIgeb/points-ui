export const counter = (state: TCounterState = 0, action: TActions) => {
  switch (action.type) {
    case 'SET_COUNTER':
      return action.payload;
    case 'INCREMENT_COUNTER':
      return state + 1;
    case 'DECREMENT_COUNTER':
      return state - 1;
    default:
      return state;
  }
};