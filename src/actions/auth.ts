import Auth0Lock from 'auth0-lock';

export const logout = (): TActions => ({ type: 'LOGOUT' });

export const login = (): TDispatchableAction => (dispatch, getState) => {
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const lock = new Auth0Lock(clientId, domain, {
    auth: {
      redirect: false,
      params: {
        scope: 'openid profile email'
      }
    }
  });

  const showLock = () =>
    new Promise<TAuthState>((resolve, reject) => {

      lock.on('hide', () => reject('Lock closed'));

      lock.on('authenticated', (authResult) => {
        lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            // Handle error 
            return;
          }

          lock.hide();
          resolve({ profile, idToken: authResult.idToken, accessToken: authResult.accessToken });
        });
      });

      lock.on('unrecoverable_error', (error) => {
        lock.hide();
        reject(error);
      });

      lock.show();
    });

  return showLock()
    .then((data) => {
      const successAction: TActions = ({
        type: 'LOGIN_SUCCESS',
        payload: data
      });
      dispatch(successAction);

      return successAction;
    })
    .catch((data) => {
      const failedAction: TActions = ({
        type: 'LOGIN_FAILED',
        payload: data.profile
      });

      dispatch(failedAction);

      return failedAction;
    });
};