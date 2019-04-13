import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../../node_modules/rxjs';

@Injectable({providedIn: 'root'})

export class AuthService {
  private token: string;
  public isAuthenticated = false;
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
    this.http.post<{token: string, message: string}>('http://localhost:3001/api/users/login', user)
    .subscribe((response) => {
      console.log(response);
      this.token = response.token;
      console.log(this.token);
      if (this.token) {
        this.authStatusListner.next(true);
        this.isAuthenticated = true;
      }
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
  }
}
