import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { DomainService } from '@core/servcies/domain.service';
import { TokenService } from '@core/servcies/token.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: HubConnection;
  chat: EventEmitter<any> = new EventEmitter<any>();

  constructor (private tokenService: TokenService) {
    this.buildConnection();
  }

  private buildConnection() {
    return this.hubConnection = new HubConnectionBuilder()
      .withUrl(DomainService.domains.hubUrl, {
        accessTokenFactory: () => {
          return this.tokenService.getToken().token;
        }
      })
      .build();
  }

  public startConnection() {
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection started ...");
        this.registerChat();
      })
      .catch((err) => {
        console.log("Connection failed ...");
        setTimeout(() => {
          this.startConnection();
        }, 1000);
      });
  }

  private registerChat() {
    this.hubConnection.on("RecieveMessageAsync", (data: any) => {
      this.chat.emit(data);
    });
  }
}
