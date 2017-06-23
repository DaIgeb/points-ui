type TState = {
  tours: TToursState;
  auth: TAuthState;
  routing: TRouterState;
};

type TToursState = number;
type TAuthState = {
  profile: auth0.Auth0UserProfile | undefined;
  idToken: string | undefined;
  accessToken: string | undefined;
};

type TRouterState = any;

type TDispatchableAction = (dispatch: (action: TActions) => void, getState: () => TState) => (TActions | Promise<TActions> | void);

type TActions = {
  type: 'LOGOUT';
} | {
    type: 'LOGIN_SUCCESS';
    payload: TAuthState;
  } | {
    type: 'LOGIN_FAILED';
    payload: object;
  };
declare const process: any;

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}