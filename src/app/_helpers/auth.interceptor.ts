import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { combineLatest, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.isAuthenticated.pipe(switchMap(isAuthenticated => {
      if (isAuthenticated) {
        return this.authService.auth.pipe(switchMap(auth => {
          if (auth.idToken) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${auth.idToken}`
              }
            });
          }

          return next.handle(request);
        }));
      }
      return next.handle(request);
    }));
  }
}
