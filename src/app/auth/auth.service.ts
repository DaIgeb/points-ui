
import { timer as observableTimer, of as observableOf, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

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

  public userProfile?: auth0.Auth0UserProfile;
  private refreshSubscription: Subscription;

  public login(url?: string): void {
    this.auth0.authorize({
      state: JSON.stringify({ url: url || window.document.location.pathname })
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getProfile(() => {
          this.router.navigate([authResult.state ? JSON.parse(authResult.state).url || '/' : '/']);
        });
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private renewToken() {
    this.auth0.checkSession({
      audience: 'rvw.eu.auth0.com'
    }, (err, result) => {
      if (!err) {
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) { return; }

    const currentExpiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = observableOf(currentExpiresAt).pipe(flatMap(
      expiresAt => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        const refreshAt = expiresAt - (1000 * 30); // Refresh 30 seconds before expiry
        return observableTimer(Math.max(1, refreshAt - now));
      }));

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
    });
  }

  private unscheduleRenewal() {
    if (!this.refreshSubscription) { return; }
    this.refreshSubscription.unsubscribe();
  }

  private setSession(authResult: auth0.Auth0DecodedHash): void {
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
    this.unscheduleRenewal();
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

  public hasRoles(roles: string[]): boolean {
    const missingRoles = this.getMissingRoles(roles);
    if (missingRoles.length === 0) {
      return true;
    }

    console.log(missingRoles);

    return false;
  }

  private getMissingRoles(roles: string[]): string[] {
    if (this.userProfile && this.userProfile.app_metadata) {
      const givenRoles: string[] = this.userProfile.app_metadata.roles;
      return roles.filter(r => givenRoles.indexOf(r) === -1);
    }

    return roles;
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
