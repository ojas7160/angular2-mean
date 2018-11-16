import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  signup(form: NgForm){
    console.log(form)
    this.http.post('http://localhost:3001/api/users/signup', {email: form.value.email, password: form.value.password})
    .subscribe(response => {
      console.log(response)
    })
  }

}
