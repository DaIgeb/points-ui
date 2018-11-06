
import { timer as observableTimer, of as observableOf, Subscription, Observable, Subject, BehaviorSubject, of, combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { flatMap, map, switchMap } from 'rxjs/operators';
import { MessageService } from '../services/message.service';

(window as any).global = window;

export interface Auth {
  readonly idToken: string;
  readonly accessToken: string;
  readonly expiresAt: number;
  readonly url: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth0 = new auth0.WebAuth({
    clientID: 'xVHE5rGaRQcoJ-NAwjv5cBXQeToVXkUC', // 'NBBkdTDcCp2MW07SHvU743q4W505iFtR',
    domain: 'rvw.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  });

  auth: Subject<Auth> = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('auth') || '{}'));
  profile: Subject<auth0.Auth0UserProfile> =
    new BehaviorSubject<auth0.Auth0UserProfile>(JSON.parse(localStorage.getItem('profile') || '{}'));

  isAuthenticated: Observable<boolean> = this.auth.pipe(switchMap(auth => {
    if (auth) {
      return this._isAuthenticated(auth.expiresAt).pipe(switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.profile.pipe(map(profile => profile !== undefined));
        }

        return of(false);
      }));
    }

    return of(false);
  }));

  private refreshSubscription: Subscription;

  constructor(public router: Router, private messageService: MessageService) {
    this.profile.subscribe(profile => {
      if (profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
      } else {
        localStorage.removeItem('profile');
      }
    });
    this.auth.subscribe(auth => {
      if (auth) {
        localStorage.setItem('auth', JSON.stringify(auth));
        this.scheduleRenewal(auth.expiresAt);

        if (auth.accessToken) {

          this.auth0.client.userInfo(auth.accessToken, (err, profile) => {
            if (err) {
              this.messageService.add(err.error);
            }
            if (profile) {
              this.profile.next(profile);
              this.router.navigate([auth.url]);
            } else {
              this.profile.next(undefined);
            }
          });


        }
      } else {
        localStorage.removeItem('auth');
      }
    });

    // this.auth.next();
  }

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

  private scheduleRenewal(currentExpiresAt: number) {
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
    this.auth.next({
      idToken: authResult.idToken,
      accessToken: authResult.accessToken,
      expiresAt: (authResult.expiresIn * 1000) + new Date().getTime(),
      url: authResult.state ? JSON.parse(authResult.state).url || '/' : '/'
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    this.auth.next(undefined);

    // this.userProfile = undefined;
    this.unscheduleRenewal();
  }

  private _isAuthenticated(expiresAt: number): Observable<boolean> {
    const isAuthenticated = new Date().getTime() < expiresAt;
    if (!isAuthenticated) {
      return this.profile.pipe(map(profile => {
        if (profile) {
          this.logout();
        }

        return false;
      }));
    }

    return of(isAuthenticated);
  }

  public hasRoles(roles: string[]): Observable<boolean> {
    return this.isAuthenticated.pipe(switchMap(isAuthenticated => {
      if (isAuthenticated) {
        return this.profile.pipe(map(profile => {
          const missingRoles = this.getMissingRoles(profile, roles);
          if (missingRoles.length === 0) {
            return true;
          }

          console.log(missingRoles);

          return false;
        }));
      }

      return of(false);
    }));
  }

  private getMissingRoles(userProfile: auth0.Auth0UserProfile, roles: string[]): string[] {
    if (userProfile && userProfile.app_metadata) {
      const givenRoles: string[] = userProfile.app_metadata.roles;
      return roles.filter(r => givenRoles.indexOf(r) === -1);
    }

    return roles;
  }

  public getAccessToken(): Observable<string> {
    return observableOf(localStorage.getItem('id_token'));
  }

  public getProfile(cb?: auth0.Auth0Callback<auth0.Auth0UserProfile>): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (err) {
        this.messageService.add(err.error);
      }
      if (profile) {
        this.profile.next(profile);
      } else {
        this.profile.next(undefined);
      }
      if (cb) {
        cb(err, profile);
      }
    });
  }

  private log(message: string) {
    this.messageService.add('AuthService: ' + message);
  }
}
