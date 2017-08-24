import 'whatwg-fetch';

import * as fromReducers from '../reducers';

export const reload = (): TDispatchableAction => (dispatch, getState): (TActions | Promise<TActions> | void) => {
  const idToken = fromReducers.getIdToken(getState());
  if (!idToken) {
    return Promise.reject('Not logged in');
  }
  if (!fromReducers.isLoadingTours(getState())) {
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
        const action: TActions = { type: 'TOURS_LOAD_FAILURE', payload: err };
        dispatch(action);

        return action;
      });
  }
};

export const storeAdd = (data: TTourCreate) => ({
  type: 'TOUR_STORE_ADD',
  payload: data
});

export const add = (newTour: TTourCreate): TDispatchableAction =>
  (dispatch, getState): (TActions | Promise<TActions> | void) => {
    const idToken = fromReducers.getIdToken(getState());
    if (!idToken) {
      return Promise.reject('Not logged in');
    }

    const request: RequestInit = {
      headers: {
        Authorization: 'Bearer ' + idToken,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ ...newTour, participants: newTour.participants.map(id => ({ id })) })
    };

    return fetch(process.env.REACT_APP_API_HOST + '/tours', request)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw Error(response.statusText);
      })
      .then((data: TTour) => {
        const action: TActions = { type: 'TOUR_ADD_SUCCESS', payload: data };
        dispatch(action);

        return action;
      })
      .catch((err) => {
        const action: TActions = { type: 'TOUR_ADD_FAILURE', payload: err };
        dispatch(action);

        return action;
      });
  };