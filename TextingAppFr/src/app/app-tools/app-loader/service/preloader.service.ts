import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  private isLoading: boolean;
  public loaderListener: BehaviorSubject<any> = new BehaviorSubject(false);

  get loading(): boolean {
    return this.isLoading;
  }

  set loading(value: boolean) {
    this.isLoading = value;
    this.loaderListener.next(this.isLoading);
  }

  startAppLoader() {
    this.loading = true;
  }

  stopAppLoader() {
    this.loading = false;
  }
}
