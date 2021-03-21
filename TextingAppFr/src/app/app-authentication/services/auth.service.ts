import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignUpModel } from '../models/signup.model';
import {
  tap,
  retry,
  catchError,
} from 'rxjs/operators';
import {
  CoreService,
} from "@core/core.service";
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenModel } from '@contract/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor (
    private http: HttpClient,
    private coreService: CoreService,
    private router: Router
  ) { }

  signUp(payload: SignUpModel) {
    return this.http.post<any>('identity/signup', payload).pipe(
      retry(1),
    );
  }

  signin(payload: any) {
    return this.http.post<TokenModel>('identity/signin', payload).pipe(
      retry(1),
      tap((res) => {
        if(res!=null){
          this.coreService.storeToken(res);
          this.router.navigate(['']);
        }
      })
    );
  }
}
