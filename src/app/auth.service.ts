import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: 'NBBkdTDcCp2MW07SHvU743q4W505iFtR',
    domain: 'rvw.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  });

  constructor(public router: Router) {
    if (this.isAuthenticated()) {
      this.getProfile();
    }
  }

  private userProfile?: auth0.Auth0UserProfile;

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getProfile();
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.userProfile = undefined;
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    const isAuthenticated = new Date().getTime() < expiresAt;
    if (!isAuthenticated) {
      if (this.userProfile) {
        this.logout();
      }
    }

    return isAuthenticated;
  }

  public getProfile(cb?: auth0.Auth0Callback<auth0.Auth0UserProfile>): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      if (cb) {
        cb(err, profile);
      }
    });
  }
}
