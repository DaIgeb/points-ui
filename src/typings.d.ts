type TState = {
  counter: TCounterState;
  auth: TAuthState;
  routing: TRouterState;
};

type TCounterState = number;
type TAuthState = auth0.Auth0UserProfile | null;
type TRouterState = object;

type TDispatchableAction = (dispatch: (action: TActions) => void, getState: () => TState) => (TActions | Promise<TActions> | void);

type TActions = {
  type: 'SET_COUNTER';
  payload: number;
} | {
    type: 'INCREMENT_COUNTER' | 'DECREMENT_COUNTER' | 'LOGOUT';
  } | {
    type: 'LOGIN_SUCCESS';
    payload: auth0.Auth0UserProfile;
  } | {
    type: 'LOGIN_FAILED';
    payload: object;
  };
declare const process: any;

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}