import { Injectable } from '@angular/core';
import { Blog } from '../blogs-folder/blog.model';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'}) // providedIn: 'root' let us defining service here only rather injecting in providers array in app module
export class BlogService {
  private blogs: Blog[] = [];
  private blogsUpdated = new Subject<Blog[]>();
  constructor(private http: HttpClient) {}
  getBlogs() {
    console.log('yes');
    console.log('-----');
    this.http.get<{message: string, blogs: any}>('http://localhost:3001/api/blogs/all-blogs')
    .pipe(map((blogData) => {
      console.log(blogData);
      return blogData.blogs.map(blog => {
        return {
          title: blog.title,
          description: blog.description,
          id: blog._id
        };
      });
    }))
    .subscribe((tranformedData) => {
      console.log('blog response', tranformedData);
      this.blogs = tranformedData;
      this.blogsUpdated.next([...this.blogs]);
    });
    // return  [...this.blogs]; // this doesn't return blogs initially because this makes a copy and we need to subscribe by this way
    // array in js do not actually copy
    // but we can copy its reference only
    // and this is a way to create a new
    // array and fill new array with old array.
  }

  addBlogs(title: string, description: string, userId: string) {
    const blog: any = {title: title, description: description, userId: userId};
    console.log('blog', blog);
    this.http.post('http://localhost:3001/api/blogs/create-blogs', blog)
      .subscribe((response) => {
        console.log(response);
      });
    this.blogs.push(blog);
    this.blogsUpdated.next([...this.blogs]);
  }

  getBlog(id: string) {
    return this.http.get('http://localhost:3001/api/blogs/' + id);
  }

  updateBlog(id: string, title: string, description: string) {
    const blog: any = {
      title: title,
      description: description,
      id: id
    };
    this.http.put<{message: string}>('http://localhost:3001/api/blogs/' + id, blog)
    .subscribe((response) => {
      console.log(response);
      const updatedBlogs = [...this.blogs];
      const blogIndex = updatedBlogs.findIndex(blog => blog.id === id);
      updatedBlogs[blogIndex] = blog;
      this.blogsUpdated.next([...updatedBlogs]);
    });
  }

  getblog(id: string) {
    console.log(this.blogs);
    return {...this.blogs.find((blog) => blog.id === id)};
  }

  getBlogUpdatedListener() {
    console.log('kjdshkjh');
    return this.blogsUpdated.asObservable();
  }
// tslint:disable-next-line:eofline
}