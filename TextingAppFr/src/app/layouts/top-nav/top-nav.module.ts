import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import * as nav from "../../root-routing/app.routes"

const routes: Routes = [
  {path:'',component:TopNavComponent,children:nav.getBusinessRoutes()}
]

@NgModule({
  declarations: [TopNavComponent, ContentComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    RouterModule.forChild(routes)
  ],
})
export class TopNavModule { }
