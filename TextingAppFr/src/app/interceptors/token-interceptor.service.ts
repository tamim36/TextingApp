import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '@core/servcies/token.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenModel } from '@contract/token.model';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor (private tokenService: TokenService, private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.tokenService.getToken()) {
      req = this.addToken(req, this.tokenService.getToken());
    }

    return next.handle(req).pipe(
      catchError((res) => {
        if (res instanceof HttpErrorResponse && res.status == 401 && this.tokenService.isTokenExpired()) {
          this.tokenService.removeToken();
          this.router.navigate(['signin']);
        }
        return throwError(res);
      })
    );
  }

  private addToken(
    request: HttpRequest<any>,
    token: TokenModel
  ): HttpRequest<any> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    return request;
  }
}
