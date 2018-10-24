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

export const storeAdd = (data: TTourCreate): TActions => ({
  type: 'TOUR_STORE_ADD',
  payload: data
});

export const storeEdit = (id: string, patch: TTourCreate): TActions => ({
  type: 'TOUR_STORE_EDIT',
  payload: {
    id,
    patch
  }
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
      body: JSON.stringify(newTour)
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

export const save = (id: string, patch: TTourCreate): TDispatchableAction =>
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
      method: 'PUT',
      body: JSON.stringify(patch)
    };

    return fetch(process.env.REACT_APP_API_HOST + '/tours/' + id, request)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw Error(response.statusText);
      })
      .then((data: TTour) => {
        const action: TActions = { type: 'TOUR_SAVE_SUCCESS', payload: data };
        dispatch(action);

        return action;
      })
      .catch((err) => {
        const action: TActions = { type: 'TOUR_SAVE_FAILURE', payload: err };
        dispatch(action);

        return action;
      });
  };

export const remove = (id: string): TDispatchableAction =>
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
      method: 'DELETE'
    };

    return fetch(process.env.REACT_APP_API_HOST + '/tours/' + id, request)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw Error(response.statusText);
      })
      .then(() => {
        const action: TActions = { type: 'TOUR_REMOVE_SUCCESS', payload: id };
        dispatch(action);

        return action;
      })
      .catch((err) => {
        const action: TActions = { type: 'TOUR_REMOVE_FAILURE', payload: err };
        dispatch(action);

        return action;
      });
  };
