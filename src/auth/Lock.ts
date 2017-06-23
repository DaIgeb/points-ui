import { Auth0UserProfile } from 'auth0-js';
import Auth0Lock from 'auth0-lock';

type TUser = {
  profile: Auth0UserProfile | null
};

const clientId = process.env.REACT_APP_AUTH0_CLIENT_SECRET;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const lock = new Auth0Lock(clientId, domain);
const profileData = localStorage.getItem('profile');
export const user: TUser = {
  profile: profileData ? JSON.parse(profileData) : null
};

lock.on('authenticated', (authResult) => {
  lock.getUserInfo(authResult.accessToken, (error, profile) => {
    if (error) {
      // Handle error 
      return;
    }

    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    user.profile = profile;

    // Update DOM 
  });
});

export const login = () => {
  lock.show();
};

export const logout = () => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('profile');
  const { protocol, hostname, port } = window.location;
  lock.logout({ returnTo: `${protocol}//${hostname}:${port}` });
};