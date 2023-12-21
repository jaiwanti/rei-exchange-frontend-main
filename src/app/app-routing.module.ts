import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './main/shared/layout/layout.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      import('../app/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
   { path: '', redirectTo: 'authentication/signin', pathMatch: 'full' },
  {
    path: 'portal',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../app/main/dashboard/dashboard.module').then(
            (m) => m.dashboardModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'property',
        loadChildren: () =>
          import('../app/main/property/property.module').then(
            (m) => m.propertyModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../app/main/user/user.module').then(
            (m) => m.userModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'new-signup',
        loadChildren: () =>
          import('./main/new-signup/new-signup.module').then(
            (m) => m.newSignUpModule
          ),
      },
      {
        path: '**',
        redirectTo: 'property',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
