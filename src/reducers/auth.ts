export const auth = (state: TAuthState = null, action: TActions) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};