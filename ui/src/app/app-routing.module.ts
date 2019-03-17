import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/containers/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { SkipAuthGuard } from './auth/guards/skip-auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SkipAuthGuard]
  },
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
