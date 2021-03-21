import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as routerConfig from './root.routes';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule,HttpClientModule, RouterModule.forRoot(routerConfig.getAppRoutes())],
  exports: [RouterModule],
})
export class RootRoutingModule {}
