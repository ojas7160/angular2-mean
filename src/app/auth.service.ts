import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../../node_modules/rxjs';

@Injectable({providedIn: 'root'})

export class AuthService {
  private token: string;
  public isAuthenticated = false;
  private tokenTimer: any;
  public userId: string;
  private authStatusListner = new Subject<boolean>();
  constructor (private http: HttpClient) {}

  getToken() {
    console.log(this.token);
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatus() {
    return this.authStatusListner.asObservable();
  }

  login(email: string, password: string) {
    const user = {email: email, password: password};
    this.http.post<{token: string, body: object, expiresIn: number, userId: string}>('http://localhost:3001/api/users/login', user)
    .subscribe((response) => {
      console.log(response);
      this.token = response.token;
      console.log(this.token);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + (response.expiresIn) * 1000);
      if (this.token) {
        this.authStatusListner.next(true);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.saveAuthData(this.token, expirationDate, this.userId);
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
      this.userId = info.userId;
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
    const userId = localStorage.getItem('userId');

    if ( !token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }

  saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.clearAuthData();
    this.userId = null;
    clearTimeout(this.tokenTimer);
  }
}
