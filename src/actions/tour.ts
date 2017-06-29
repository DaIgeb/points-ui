import 'whatwg-fetch';

import * as fromReducers from '../reducers';

export const reload = (): TDispatchableAction => (dispatch, getState): (TActions | Promise<TActions> | void) => {
  const idToken = fromReducers.getIdToken(getState());
  if (!idToken) {
    return Promise.reject('Not logged in');
  }
  if (fromReducers.isLoadingTours(getState())) {
    return Promise.reject('Currently loading');
  }

  dispatch({
    type: 'TOURS_LOAD'
  });

  const request: RequestInit = {
    headers: {
      Authorization: 'Bearer ' + idToken,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  };

  return fetch(process.env.REACT_APP_API_HOST + '/tours', request)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw Error(response.statusText);
    })
    .then((data: TTour[]) => {
      const action: TActions = { type: 'TOURS_LOAD_SUCCESS', payload: data };
      dispatch(action);

      return action;
    })
    .catch((err) => {

      return Promise.reject(err);
    });
};