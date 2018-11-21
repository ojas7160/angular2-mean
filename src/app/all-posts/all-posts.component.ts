import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3001/api/posts/posts')
    .subscribe((response) => {
      console.log(response);
    });
  }

}
