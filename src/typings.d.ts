type TState = {
  tours: TToursState;
  people: TPeopleState;
  auth: TAuthState;
  routing: TRouterState;
};

type TInfoState = {
  loaded: boolean;
  loading: boolean;
};
type TAllState = {
  ids: string[];
};

type TByCodeState<TItem> = {
  byId: { [id: string]: TItem };
}

type TToursState = {
  all: TAllState;
  byCode: TByCodeState<TTour>;
  info: TInfoState;
};
type TPeopleState = {
  all: TAllState;
  byCode: TByCodeState<TPerson>;
  info: TInfoState;
};
type TProfile = auth0.Auth0UserProfile & { roles?: string[] };
type TAuthState = {
  profile: TProfile | undefined;
  idToken: string | undefined;
  accessToken: string | undefined;
};

type TRouterState = any;

type TTour = {
  id: string;
  name: string;
  points: 15 | 20 | 40 | 80 | 150;
  elevation: number;
  distance: number;
  participants: { id: string; }[];
  user: string;
  createdAt: number;
  updatedAt: number;
}

type TPerson = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  user: string;
  createdAt: number;
  updatedAt: number;
}

type TDispatchableAction = (dispatch: (action: TActions) => void, getState: () => TState) => (TActions | Promise<TActions> | void);

type TActions = {
  type: 'LOGOUT';
} | {
    type: 'LOGIN_SUCCESS';
    payload: TAuthState;
  } | {
    type: 'LOGIN_FAILED';
    payload: object;
  } | {
    type: 'TOURS_LOAD_SUCCESS';
    payload: TTour[];
  } | {
    type: 'TOURS_LOAD_FAILURE';
    payload: TTour;
  } | {
    type: 'TOURS_LOAD';
  } | {
    type: 'PERSON_LOAD_SUCCESS';
    payload: TPerson[];
  } | {
    type: 'PERSON_LOAD_FAILURE';
    payload: TPerson;
  } | {
    type: 'PERSON_LOAD';
  };

declare const process: any;

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}