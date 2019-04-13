import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Blog } from '../blog.model';
import { BlogService } from '../blogs.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
// import { PageEvent } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit, OnDestroy {
  // @Input() blogs: Blog[] = [];
  blogs: Blog[] = [];
  pageSize = 10;
  total = 100;
  p = 1;
  pageSizeOption = [1, 2, 5, 10];
  authStatus = false;
  private blogSub: Subscription;
  public authListenerSub: Subscription;
  constructor( // automatically creates a property of same name
    public blogService: BlogService,
    private http: HttpClient,
    private authService: AuthService
  ) {
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
    this.blogService.getBlogs(this.pageSize, this.p);
    console.log('blogs', this.blogs);
    this.blogSub = this.blogService.getBlogUpdatedListener()
    .subscribe((blogs: Blog[]) => {
      this.blogs = blogs;
      console.log(this.blogs);
    });
    this.authStatus = this.authService.getIsAuthenticated();
    this.authListenerSub = this.authService.getAuthStatus().subscribe(isAuthenticated => {
      this.authStatus = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.blogSub.unsubscribe();
    this.authListenerSub.unsubscribe();
  }

  pageChange(event) {
    console.log(this.p);
  }

  pageChangeSelect(event) {
    console.log(event);
    // this.blogService.getBlogs(this.pageSize, this.p);
    // this.blogSub = this.blogService.getBlogUpdatedListener()
    // .subscribe((blogs: Blog[]) => {
    //   this.blogs = blogs;
    //   console.log(this.blogs);
    // });
  }

  newPageChange() {
    console.log('----');
    this.blogService.getBlogs(this.pageSize, this.p);
  }

  deleteBlog(blog) {
    this.http.delete('http://localhost:3001/api/blogs/' + blog.id + '/delete-blog')
    .subscribe((response) => {
      console.log(response);
      const blogUpdated = this.blogs.filter(blogData => blogData.id !== blog.id);
      this.blogs = blogUpdated;
    });
  }
}
