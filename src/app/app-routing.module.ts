import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { Error404Component } from './pages/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent }
    ]
  },
  { path: 'auth', component: DefaultComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'reset-password', component: ResetPasswordComponent }
    ]
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
