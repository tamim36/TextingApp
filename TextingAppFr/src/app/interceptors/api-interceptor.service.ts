import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomainService } from '@core/servcies/domain.service';

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptorService implements HttpInterceptor {
  constructor () { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.search(/^.*(.svg)$/) >= 0) {
      console.log(req.url);
      return next.handle(req);
    }
    let request = req.clone({
      url: DomainService.domains.apiHost + req.url,
    });
    console.log('api');

    return next.handle(request);
  }
}
