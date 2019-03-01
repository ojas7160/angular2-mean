import { Injectable } from '@angular/core';
import { Blog } from '../blogs-folder/blog.model';

import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'}) // providedIn: 'root' let us defining service here only rather injecting in providers array in app module
export class BlogService {
  private blogs: Blog[] = [];
  private blogsUpdated = new Subject<Blog[]>();

  getBlogs() {
    console.log('yes');
    return  [...this.blogs]; // this doesn't return blogs initially because this makes a copy and we need to subscribe by this way
    // array in js do not actually copy
    // but we can copy its reference only
    // and this is a way to create a new
    // array and fill new array with old array.
  }

  addBlogs(title: string, description: string) {
    const blog: Blog = {title: title, description: description};
    console.log('blog', blog);
    this.blogs.push(blog);
    this.blogsUpdated.next(this.blogs);
  }

  getBlogUpdatedListener() {
    return this.blogsUpdated.asObservable();
  }
// tslint:disable-next-line:eofline
}