import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: any = [];
  // @Input() allPosts: any = [];

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3001/api/posts/posts')
    .subscribe((response) => {
      console.log(response);
      // this.posts = response.posts;
    });
  }

  onPostAdded(post) {
    // this.allPosts.push(post);
  }
}
