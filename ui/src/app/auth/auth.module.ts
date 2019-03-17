import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { AuthHttpInterceptor } from './interceptors/auth-http.interceptor';
import { SkipAuthGuard } from './guards/skip-auth.guard';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [LoginComponent],
  providers: [
    AuthGuard,
    AuthService,
    SkipAuthGuard,
    {
      provide: JwtHelperService,
      useFactory: () => new JwtHelperService()
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  imports: [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule]
})
export class AuthModule {}
