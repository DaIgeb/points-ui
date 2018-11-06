import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    const roles = (next.data as any).expectedRoles;

    return this.checkLogin(url, roles);
  }

  private checkLogin(url: string, roles: string[]): Observable<boolean> {
    return this.authService.hasRoles(roles).pipe(
      map((hasRoles) => {
        if (hasRoles) {
          return true;
        }

        this.authService.login(url);

        return false;
      })
    );
  }
}
