import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-posts-component',
  templateUrl: './posts-component.component.html',
  styleUrls: ['./posts-component.component.css']
})
export class PostsComponentComponent implements OnInit {

  constructor(public http: HttpClient) {
    console.log('here');
   }

  ngOnInit() {
  }


createPost(form: NgForm){
    console.log(form)
    let post = {title: form.value.title, description: form.value.description};
    this.http.post('http://localhost:3001/api/posts', {title: form.value.title, description: form.value.description})
    .subscribe((response) => {
      console.log(response)
    })
}


}
