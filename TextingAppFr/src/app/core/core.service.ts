import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TokenModel } from '@contract/token.model';
import { FormService } from './servcies/form.service';
import { IconService } from './servcies/icon.service';
import { NavTracerService } from './servcies/nav-tracer.service';
import { TokenService } from './servcies/token.service';
import { SignalrService } from './services/signalr.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private _tokenService: TokenService;
  private _formService: FormService;
  private _navTracerService: NavTracerService;
  private _iconService: IconService;
  private _signalRService: SignalrService;

  constructor (private injector: Injector) { }

  get tokenServie() {
    if (!this._tokenService) {
      this._tokenService = this.injector.get(TokenService);
    }
    return this._tokenService;
  }

  get formService() {
    if (!this._formService) {
      this._formService = this.injector.get(FormService);
    }
    return this._formService;
  }

  get iconService() {
    if (!this._iconService) {
      this._iconService = this.injector.get(IconService);
    }
    return this._iconService;
  }

  get navTracerService() {
    if (!this._navTracerService) {
      this._navTracerService = this.injector.get(NavTracerService);
    }
    return this._navTracerService;
  }

  get signalRService() {
    if (!this._signalRService) {
      this._signalRService = this.injector.get(SignalrService);
    }
    return this._signalRService;
  }

  setTitle(routes: ActivatedRoute,
    appName: string,
    separator1: string = ':',
    separator2: string = '>') {
    this.navTracerService.setTitle(routes, appName, separator1, separator2);
  }

  activatedRouteBroadCaster() {
    this.navTracerService.activatedRouteBroadCaster();
  }

  currentRoute() {
    return this.navTracerService.routeReceiver;
  }

  loadIcons(iconList: string[]) {
    this.iconService.loadIcons(iconList);
  }

  handleFormError(formGorup: FormGroup,
    errorObservers: object,
    errorTypeGenerator: (type: string, owner: string) => any) {
    this.formService.handleFormError(formGorup, errorObservers, errorTypeGenerator);
  }

  checkFormState(formGorup: FormGroup) {
    this.formService.checkFormStatus(formGorup);
  }

  storeToken(token: TokenModel) {
    this.tokenServie.storeToken(token);
  }

  removeToken() {
    this.tokenServie.removeToken();
  }

  getToken() {
    return this.tokenServie.getToken();
  }

  hasToken() {
    return this.tokenServie.hasToken();
  }

  isTokenExpired() {
    return this.tokenServie.isTokenExpired();
  }

  startSignalRConnection() {
    this.signalRService.startConnection();
  }
}
