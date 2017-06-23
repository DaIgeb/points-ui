export * from './auth';

export const set = (value: number): TActions => ({
  type: 'SET_COUNTER',
  payload: value
});

export const increment = (): TActions => ({
  type: 'INCREMENT_COUNTER'
});

export const decrement = (): TActions => ({
  type: 'DECREMENT_COUNTER'
});

export const incrementIfOdd = (): TDispatchableAction => (dispatch, getState) => {
  const { counter } = getState();

  if (counter % 2 === 0) {
    return;
  }

  dispatch(increment());
};

export const incrementAsync = (delay: number = 1000): TDispatchableAction => dispatch => {
  setTimeout(
    () => dispatch(increment()),
    delay
  );
};