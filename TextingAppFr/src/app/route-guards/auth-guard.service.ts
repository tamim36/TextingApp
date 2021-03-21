import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '@core/servcies/token.service';
import * as permission from './permissions.route';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor (private tokenService: TokenService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (!this.tokenService.hasToken()) {
      console.log(state);
      if (!permission.isAuhtRoute(state.url)) {
        return true;
      }
      this.router.navigate(['signin']);
      return false;
    }
    if (!permission.isAuhtRoute(state.url)) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean | UrlTree | Observable<boolean | UrlTree> {
    console.log(this.tokenService.hasToken());
    if (!this.tokenService.hasToken()) {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
