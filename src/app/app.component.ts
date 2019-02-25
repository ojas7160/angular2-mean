import { Component, Input } from '@angular/core';
import { Blog } from './blogs-folder/blog.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basic-angular2-app';
  @Input() allBlogs: Blog[] = [];

  onBlogAdded(blog) {
    this.allBlogs.push(blog);
  }
}
