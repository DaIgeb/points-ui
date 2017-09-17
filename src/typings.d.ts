type TState = {
  tours: TToursState;
  routes: TRoutesStates;
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
  add: TAddState<TTourCreate>;
  all: TAllState;
  byCode: TByCodeState<TTour>;
  info: TInfoState;
};
type TRoutesStates = {
  add: TAddState<TRouteCreate>;
  all: TAllState;
  byCode: TByCodeState<TRoute>;
  info: TInfoState;
};

type TAddStates = 'editing' | 'adding' | 'success';

type TAddState<TCreate> = {
  state: TAddStates;
  template: Partial<TCreate>
};

type TPeopleState = {
  add: TAddState<TPersonCreate>;
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

type TPoints = 15 | 20 | 40 | 80 | 150;
type TTour = TTourCreate & TBase;
type TTourCreate = {
  route: string;
  date: string;
  points: TPoints;
  participants: string[];
}

type TPerson = TPersonCreate & TBase;
type TPersonCreate = {
  firstName: string;
  lastName: string;
  email: string;
};

type TRoute = TRouteCreate & TBase;
type TRouteCreate = {
  name: string;
  elevation: number;
  distance: number;
}

type TBase = {
  id: string;
  user: string;
  createdAt: number;
  updatedAt: number;
}

type TDispatchableAction = (dispatch: (action: TActions) => void, getState: () => TState) => (TActions | Promise<TActions> | void);

type TActions = {
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
    type: 'PERSON_LOAD_SUCCESS';
    payload: TPerson[];
  } | {
    type: 'PERSON_LOAD_FAILURE';
    payload: TPerson;
  } | {
    type: 'PERSON_ADD_SUCCESS';
    payload: TPerson;
  } | {
    type: 'PERSON_ADD_FAILURE' | 'ROUTE_ADD_FAILURE' | 'TOUR_ADD_FAILURE';
    payload: any;
  } | {
    type: 'PERSON_LOAD' | 'PERSON_STORE_ADDING' | 'ROUTES_LOAD' | 'ROUTE_STORE_ADDING' | 'TOURS_LOAD' | 'TOUR_STORE_ADDING' | 'LOGOUT';
  } | {
    type: 'PERSON_STORE_ADD';
    payload: TPersonCreate;
  } | {
    type: 'ROUTES_LOAD_SUCCESS';
    payload: TRoute[];
  } | {
    type: 'ROUTES_LOAD_FAILURE';
    payload: TRoute;
  } | {
    type: 'ROUTE_STORE_ADD';
    payload: TRouteCreate;
  }
  | {
    type: 'ROUTE_ADD_SUCCESS';
    payload: TRoute;
  } | {
    type: 'TOUR_STORE_ADD';
    payload: TTourCreate;
  }
  | {
    type: 'TOUR_ADD_SUCCESS';
    payload: TTour;
  };

declare const process: any;

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare module 'autosuggest-highlight/match' {
  const match: (text: string, query: string) => number[][];
  export = match;
}

declare module 'autosuggest-highlight/parse' {
  const parse: (text: string, matches: number[][]) => { text: string; highlight: boolean }[];
  export = parse;
}