import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageGroup } from '@contract/message-group.model';
import { SharedMessageModel } from '@contract/shared-message.model';
import { TextMessageModel } from '@contract/text-message.model';
import { UserModel } from '@contract/user.model';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatBoxService {

  constructor (private http: HttpClient) { }

  getUserList() {
    return this.http.get<UserModel[]>("user").pipe(
      retry(1),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getUser(id: number) {
    return this.http.get<UserModel>(`user/${id}`).pipe(
      retry(1),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  sendMessage(route: string, message: Partial<SharedMessageModel>) {
    return this.http.post<TextMessageModel>(`chat/${route}`, message).pipe(
      retry(1),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getOldMessages() {
    return this.http.get<MessageGroup[]>("chat/old");
  }

  getOldText(id: number) {
    return this.http.get<any>(`chat/group/${id}`);
  }

  createGroup(payload) {
    return this.http.post<MessageGroup>("chat/create", payload);
  }

  deleteMessageGroup(payload) {
    return this.http.post("chat/delete", payload);
  }

  removeTextmsg(payload){
    return this.http.post('chat/deleteSingle', payload)
  }
}
