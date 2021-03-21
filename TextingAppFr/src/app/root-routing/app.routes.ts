import { Routes } from '@angular/router';
import { AuthGuardService } from '@route-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../app-dashboard/app-dashboard.module').then(
        (module) => module.AppDashboardModule
      ),
    data: {
      breadCrumb: 'Chat Box',
    },
    canActivateChild: [AuthGuardService],
  },
];

export function getBusinessRoutes() {
  return routes;
}
