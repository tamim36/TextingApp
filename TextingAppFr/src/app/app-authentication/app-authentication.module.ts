import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiginComponent } from './components/sigin/sigin.component';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SharedMaterialModule } from '@shared-material/shared-material.module';
import { FormsMaterialModule } from '@shared-material/forms-material.module';
import { AuthGuardService } from '@route-guard';

const routes: Routes = [
  {
    path: 'signin',
    component: SiginComponent,
    data: {
      breadCrumb: 'SignIn',
    },
    canActivate: [AuthGuardService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      breadCrumb: 'SignUp',
    },
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [
    SiginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild(routes),
    FormsMaterialModule,
  ],
})
export class AppAuthenticationModule { }
