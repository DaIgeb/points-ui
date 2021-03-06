import 'whatwg-fetch';

import * as fromReducers from '../reducers';

export const reload = (): TDispatchableAction => (dispatch, getState): (TActions | Promise<TActions> | void) => {
  const idToken = fromReducers.getIdToken(getState());
  if (!idToken) {
    return Promise.reject('Not logged in');
  }
  if (!fromReducers.isLoadingRoutes(getState())) {
    dispatch({
      type: 'ROUTES_LOAD'
    });

    const request: RequestInit = {
      headers: {
        Authorization: 'Bearer ' + idToken,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    };

    return fetch(process.env.REACT_APP_API_HOST + '/routes', request)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw Error(response.statusText);
      })
      .then((data: TRoute[]) => {
        const action: TActions = { type: 'ROUTES_LOAD_SUCCESS', payload: data };
        dispatch(action);

        return action;
      })
      .catch((err) => {
        const action: TActions = { type: 'ROUTES_LOAD_FAILURE', payload: err };
        dispatch(action);

        return action;
      });
  }
};

export const storeAdd = (data: TRouteCreate) => ({
  type: 'ROUTE_STORE_ADD',
  payload: data
});

export const add = (newPerson: TRouteCreate): TDispatchableAction =>
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

    return fetch(process.env.REACT_APP_API_HOST + '/routes', request)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw Error(response.statusText);
      })
      .then((data: TRoute) => {
        const action: TActions = { type: 'ROUTE_ADD_SUCCESS', payload: data };
        dispatch(action);

        return action;
      })
      .catch((err) => {
        const action: TActions = { type: 'ROUTE_ADD_FAILURE', payload: err };
        dispatch(action);

        return action;
      });
  };