import 'whatwg-fetch';

import * as fromReducers from '../reducers';

export const reload = (): TDispatchableAction => (dispatch, getState): (TActions | Promise<TActions> | void) => {
  const idToken = fromReducers.getIdToken(getState());
  if (!idToken) {
    return Promise.reject('Not logged in');
  }
  if (!fromReducers.isLoadingPeople(getState())) {
    dispatch({
      type: 'PERSON_LOAD'
    });

    const request: RequestInit = {
      headers: {
        Authorization: 'Bearer ' + idToken,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    };

    return fetch(process.env.REACT_APP_API_HOST + '/people', request)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw Error(response.statusText);
      })
      .then((data: TPerson[]) => {
        const action: TActions = { type: 'PERSON_LOAD_SUCCESS', payload: data };
        dispatch(action);

        return action;
      })
      .catch((err) => {
        const action: TActions = { type: 'PERSON_LOAD_FAILURE', payload: err };
        dispatch(action);

        return action;
      });
  }
};

export const storeAdd = (data: TPersonCreate) => ({
  type: 'PERSON_STORE_ADD',
  payload: data
});

export const add = (newPerson: TPersonCreate): TDispatchableAction =>
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
      body: JSON.stringify(newPerson)
    };

    return fetch(process.env.REACT_APP_API_HOST + '/people', request)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw Error(response.statusText);
      })
      .then((data: TPerson) => {
        const action: TActions = { type: 'PERSON_ADD_SUCCESS', payload: data };
        dispatch(action);

        return action;
      })
      .catch((err) => {
        const action: TActions = { type: 'PERSON_ADD_FAILURE', payload: err };
        dispatch(action);

        return action;
      });
  };