import { Injectable } from '@angular/core';
import { UserModel } from '@contract/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStateService {
  private userState: Subject<UserModel> = new Subject<UserModel>();
  constructor () { }

  userState$ = this.userState.asObservable();

  broadCastUser(data: UserModel) {
    this.userState.next(data);
  }
}
