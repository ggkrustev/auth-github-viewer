import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpEventType
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authService: AuthService, private router: Router) {}

  // TODO: fix the return type
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.authService.getJwtToken();

    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError(error => {
        // TODO: handle 401 responses
        // if (error instanceof HttpErrorResponse && error.status === 401) {
        //   return this.handle401Error(request, next);
        // } else {
        //   return throwError(error);
        // }

        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    this.router.navigate(['/logout']);

    return next;
  }
}
