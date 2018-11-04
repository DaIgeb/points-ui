import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

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

  private checkLogin(url: string, roles: string[]): boolean {
    if (this.authService.isAuthenticated() && this.authService.hasRoles(roles)) { return true; }

    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    // this.router.navigate(['/login']);
    this.authService.login(url);

    return false;
  }
}
