import { Auth0UserProfile } from 'auth0-js';
import Auth0Lock from 'auth0-lock';

interface ShowLock {
  profile: Auth0UserProfile;
  idToken: string;
}

export const logout = (): TActions => ({ type: 'LOGOUT' });

export const login = (): TDispatchableAction => (dispatch, getState) => {
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_SECRET;
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const lock = new Auth0Lock(clientId, domain, {
    auth: { redirect: false }
  });

  const showLock = () =>
    new Promise<ShowLock>((resolve, reject) => {

      lock.on('hide', () => reject('Lock closed'));

      lock.on('authenticated', (authResult) => {
        lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            // Handle error 
            return;
          }

          lock.hide();
          resolve({ profile, idToken: authResult.idToken });
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
        payload: data.profile
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