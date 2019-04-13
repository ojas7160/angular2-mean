import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public http: HttpClient, public authService: AuthService ) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    console.log(form);
    // const user = {email: form.value.email, password: form.value.password};
    this.authService.login(form.value.email, form.value.password);
  }

}
