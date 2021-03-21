import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModel } from "@contract/token.model";
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly accessToken: string = 'accessToken';
  constructor (private jwtService: JwtHelperService) { }

  storeToken(token: TokenModel) {
    localStorage.setItem(this.accessToken, token.token);
  }

  removeToken() {
    localStorage.removeItem(this.accessToken);
  }

  getToken(): TokenModel {
    let access = localStorage.getItem(this.accessToken);
    if (!(access)) {
      return null;
    }

    let token: TokenModel = {
      token: access,
    };

    return token;
  }

  isTokenExpired(): boolean {
    let access = localStorage.getItem(this.accessToken);
    return this.jwtService.isTokenExpired(access);
  }

  hasToken() {
    if (this.getToken() == null) {
      return false;
    }

    return true;
  }
}
