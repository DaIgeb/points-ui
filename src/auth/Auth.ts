import { WebAuth, Management, Auth0DecodedHash, Auth0Error, Auth0UserProfile } from 'auth0-js';
import { history } from '../history';

const requestedScopes = 'openid profile groups permissions roles app_metadata.authorization.roles';
const auth0 = new WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URL,
  audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
  /*audience: `https://api.aws.daigeb.ch`,
  audience: `https://rvw.eu.auth0.com/api/v2/`,
  audience: `urn:auth0-authz-api`,*/
  responseType: 'token id_token',
  scope: requestedScopes
});

export const getUser = (callback: (error: Auth0Error | null, user: Auth0UserProfile | undefined) => void) => {
  getProfile((error, profile) => {
    if (error) {
      callback(error, undefined);
      return;
    }
    if (!profile) {
      callback(new Error('No profile found'), undefined);
      return;
    }
    const idToken = localStorage.getItem('id_token');
    const management = new Management({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      token: idToken || ''
    });

    management.getUser(profile.sub, (getUserError, user) => {
      callback(getUserError, user);
    });

  });

};

export const login = () => {
  auth0.authorize({
    redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URL,
    responseType: 'token id_token',
    audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
    // audience: `https://api.aws.daigeb.ch`,
    scope: requestedScopes
  });
};

export const handleAuthentication = () => {
  auth0.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult);
      history.replace('/home');
    } else if (err) {
      history.replace('/home');
    }
  });
};

export const setSession = (authResult: Auth0DecodedHash) => {
  // Set the time that the access token will expire at
  let expiresAt = JSON.stringify(((authResult.expiresIn || 0) * 1000) + new Date().getTime());
  // If there is a value on the `scope` param from the authResult,
  // use it to set scopes in the session for the user. Otherwise
  // use the scopes as requested. If no scopes were requested,
  // set it to nothing
  // tslint:disable-next-line:no-any
  const authScope = (authResult as any).scope;
  const scopes = authScope || requestedScopes || '';
  localStorage.setItem('access_token', authResult.accessToken || '');
  localStorage.setItem('id_token', authResult.idToken || '');
  localStorage.setItem('identity', JSON.stringify(authResult.idTokenPayload) || '{}');
  localStorage.setItem('expires_at', expiresAt);
  localStorage.setItem('scopes', JSON.stringify(scopes));

  // navigate to the home route
  history.replace('/home');
};

export const logout = () => {
  // Clear access token and ID token from local storage
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('identity');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('scopes');
  // navigate to the home route
  history.replace('/home');
};

export const isAuthenticated = () => {
  // Check whether the current time is past the 
  // access token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem('expires_at') || '0');
  return new Date().getTime() < expiresAt;
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }
  return accessToken;
};

export const getToken = (callback: (error: Error | undefined, token: string) => void) => {
  auth0.client.oauthToken({}, (err, token) => {
    callback(err ? new Error(err as string) : undefined, token);
  });
};

export const getProfile = (cb: (error: Auth0Error | null, profile: Auth0UserProfile | undefined) => void) => {
  try {
    let accessToken = getAccessToken();
    auth0.client.userInfo(accessToken, (err, profile) => {
      cb(err, profile);
    });
  } catch (error) {
    cb(error, undefined);
  }
};

export const userHasScopes = (scopes: string[]) => {
  const scopesStorage = localStorage.getItem('scopes');
  const grantedScopes = scopesStorage ? JSON.parse(scopesStorage).split(' ') : [];
  return scopes.every(scope => grantedScopes.includes(scope));
};
