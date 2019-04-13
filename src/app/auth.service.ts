import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../../node_modules/rxjs';

@Injectable({providedIn: 'root'})

export class AuthService {
  private token: string;
  public isAuthenticated = false;
  private tokenTimer: any;
  private authStatusListner = new Subject<boolean>();
  constructor (private http: HttpClient) {}

  getToken() {
    console.log(this.token);
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatus() {
    return this.authStatusListner.asObservable();
  }

  login(email: string, password: string) {
    const user = {email: email, password: password};
    this.http.post<{token: string, message: string, expiresIn: number}>('http://localhost:3001/api/users/login', user)
    .subscribe((response) => {
      console.log(response);
      this.token = response.token;
      console.log(this.token);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + (response.expiresIn) * 1000);
      if (this.token) {
        this.authStatusListner.next(true);
        this.isAuthenticated = true;
        this.saveAuthData(this.token, expirationDate);
        this.setAuthTimer(response.expiresIn);
      }
    });
  }

  autoAuthData() {
    console.log('auth-------');
    const info = this.getAuthData();
    console.log('info', info);
    if (!info) {
      return;
    }
    const now = new Date();
    const expiresIn = info.expirationDate.getTime() - now.getTime();
    console.log(info, expiresIn);
    if (expiresIn > 0) {
      this.authStatusListner.next(true);
      this.isAuthenticated = true;
      this.token = info.token;
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  setAuthTimer (expiresIn: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresIn * 1000); // expires in one hour
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if ( !token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }

  saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }
}
