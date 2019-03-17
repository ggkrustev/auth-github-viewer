import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from '../../config';
import { LoginData } from '../models/login-data.model';
import { JwtHelperService } from '@auth0/angular-jwt';

// TODO:
// 1. abstract JWT storage -> session.service storage

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  public user: BehaviorSubject<string>;

  constructor(private http: HttpClient, private jwtService: JwtHelperService) {
    this.user = new BehaviorSubject(this.getJwtUser());
  }

  login(user: { username: string; password: string }): Observable<LoginData> {
    return this.http.post<any>(`${config.apiUrl}/auth/login`, user).pipe(
      tap((data: LoginData) => {
        const { token } = data;
        this.doLoginUser(user.username, token);
      })
    );
  }

  logout() {
    this.doLogoutUser();
    /*
     * TODO: implement in future when there is a server session
     *
    const data = { token: this.getJwtToken() };
    return this.http.post<any>(`${config.apiUrl}/auth/logout`, data).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
      */
  }

  isLoggedIn() {
    return !this.jwtService.isTokenExpired(this.getJwtToken());
  }

  getJwtToken() {
    return sessionStorage.getItem(this.JWT_TOKEN);
  }

  getJwtUser() {
    const token = this.getJwtToken();
    const decoded = this.jwtService.decodeToken(token);
    return decoded ? decoded.email : null;
  }

  private doLoginUser(username: string, token: string) {
    this.user.next(username);
    this.storeToken(token);
  }

  private doLogoutUser() {
    this.user.next(null);
    this.removeToken();
  }

  private storeToken(token: string) {
    sessionStorage.setItem(this.JWT_TOKEN, token);
  }

  private removeToken() {
    sessionStorage.removeItem(this.JWT_TOKEN);
  }
}
