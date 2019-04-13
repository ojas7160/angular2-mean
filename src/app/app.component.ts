import { Component, Input, OnInit } from '@angular/core';
import { Blog } from './blogs-folder/blog.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {}
  title = 'basic-angular2-app';
  // @Input() allBlogs: Blog[] = [];

  // onBlogAdded(blog) {
  //   this.allBlogs.push(blog);
  // }

  ngOnInit() {
    console.log('app');
    this.authService.autoAuthData();
  }
}
