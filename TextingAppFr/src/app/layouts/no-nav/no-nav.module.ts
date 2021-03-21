import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoNavComponent } from './components/no-nav/no-nav.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import * as fullpage from "../../root-routing/full-page.routes";

const routes: Routes = [
  {path:'',component:NoNavComponent,children:fullpage.getFullPageLayoutRoute()}
]

@NgModule({
  declarations: [NoNavComponent, ContentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NoNavModule { }
