import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@contract/user.model';
import { DataStateService } from '@core/servcies/data-state.service';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (private http: HttpClient, private dataState: DataStateService) { }

  getUserProfile() {
    return this.http.get<UserModel>("user/profile").pipe(
      retry(1),
      catchError(err => {
        return throwError(err);
      }),
      tap(res => {
        this.dataState.broadCastUser(res);
      })
    );
  }
}
