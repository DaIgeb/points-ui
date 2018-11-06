import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Auth0UserProfile } from 'auth0-js';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  userProfile: Auth0UserProfile;
  isAuthenticated: boolean;

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService) { }

  ngOnInit() {
    this.authService.profile.subscribe(profile => this.userProfile = profile);
    this.authService.isAuthenticated.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }
}
