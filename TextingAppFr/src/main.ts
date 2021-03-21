import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/root/app.module';
import { environment } from './environments/environment';

declare global {
  interface Window {
    ServerConst: any;
  }
}

window.ServerConst = window.ServerConst || {};

if (environment.production) {
  enableProdMode();
}

if (window) {
  window.ServerConst = environment;
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
