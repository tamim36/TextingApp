import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {path:'',component:NotFoundComponent,data:{breadCrumb:''}}
]

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class AppNotFoundModule { }
