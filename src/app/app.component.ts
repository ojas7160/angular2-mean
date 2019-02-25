import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basic-angular2-app';
  @Input()  allBlogs: any = [];
  
  onBlogAdded(blog) {
    this.allBlogs.push(blog);
  }
}
