const defaultState: TAuthState = {
  profile: undefined,
  accessToken: undefined,
  idToken: undefined
};

export const reducer = (state: TAuthState = defaultState, action: TActions) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const getProfile = (state: TAuthState) => state.profile;
export const getIdToken = (state: TAuthState) => state.idToken;