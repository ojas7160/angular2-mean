import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Blog } from '../blog.model';
import { BlogService } from '../blogs.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit, OnDestroy {
  // @Input() blogs: Blog[] = [];
  blogs: Blog[] = [];
  private blogSub: Subscription;
  constructor(public blogService: BlogService, private http: HttpClient) { // automatically creates a property of same name
    // this blogService, we can fetch
    // this variable in the entire file
    // with 'this.blogService' only because
    // of public otherwise we have to define
    // a variable first and assignee it to that
    // variable defined and then use that variable
    // in file.
  }

  ngOnInit() { // runs auto when this component is made. it requires onInit interface to be implemented
    console.log('here-----------');
    this.blogService.getBlogs();
    console.log('blogs', this.blogs);
    this.blogSub = this.blogService.getBlogUpdatedListener()
    .subscribe((blogs: Blog[]) => {
      this.blogs = blogs;
      console.log(this.blogs);
    });
  }

  ngOnDestroy() {
    this.blogSub.unsubscribe();
  }

  deleteBlog(blog) {
    this.http.delete('http://localhost:3001/api/blogs/'+ blog.id +'/delete-blog')
    .subscribe((response) => {
      console.log(response);
      const blogUpdated = this.blogs.filter(blogData => blogData.id !== blog.id);
      this.blogs = blogUpdated;
    });
  }
}
