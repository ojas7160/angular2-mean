import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-posts-component',
  templateUrl: './posts-component.component.html',
  styleUrls: ['./posts-component.component.css']
})
export class PostsComponentComponent implements OnInit {
  @Input() post: any;
  @Output() allPosts: any;
  @Output() postCreated = new EventEmitter();

  constructor(public http: HttpClient) {
    console.log('here');
  }

  ngOnInit() {
    this.http.get('http://localhost:3001/api/users/user?user_id='+localStorage.getItem('userId'))
    .subscribe((response) => {
      console.log(response)
    })
  }


  createPost(form: NgForm){
    console.log(form)
    let post = {title: form.value.title, description: form.value.description};
    const userId = localStorage.getItem('userId');
    this.http.post('http://localhost:3001/api/posts', {title: form.value.title, description: form.value.description, userId: userId})
    .subscribe((response) => {
      console.log(response)
      // this.postCreated.emit(response);
    })
  }
}
