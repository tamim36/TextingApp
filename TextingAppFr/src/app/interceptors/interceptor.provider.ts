import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorService } from './api-interceptor.service';
import { TokenInterceptorService } from './token-interceptor.service';

interface Providers {
  provide: any;
  useClass: any;
  multi: boolean;
}

export const interceptorProvider: Providers[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptorService,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },
];
